import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CartService } from 'src/cart/cart.service'
import { CategoriesService } from 'src/catedories/catedories.service'
import { FileDto } from 'src/file/file.dto'
import { FileService } from 'src/file/file.service'
import { UserService } from 'src/user/user.service'
import { Equal, LessThan, LessThanOrEqual, MoreThan, Repository } from 'typeorm'
import { DeleteCoinDto } from './dto/delete-coin.dto'
import { FindCoinDto } from './dto/find-coin.dto'
import { PutCoinDto } from './dto/put-coin.dto'
import { UpdateCoinDto } from './dto/update-coin.dto'
import { CoinEntity } from './entities/coin.entity'

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(CoinEntity)
    private readonly coinRepo: Repository<CoinEntity>,
    private readonly catService: CategoriesService,
    private readonly fileService: FileService,
    private readonly userService: UserService,
    private readonly cartService: CartService,
  ) {}
  async findOneById(coin_id: number) {
    const coin = await this.coinRepo.findOne({
      where: {
        id: coin_id,
      },
      relations: {
        category: true,
        cart: {
          user: true,
        },
      },
    })

    if (!coin) throw new NotFoundException('Монета не найдена')

    return coin
  }

  async findAll(sort?: 'ASC' | 'DESC') {
    return await this.coinRepo.find({
      relations: {
        category: true,
        cart: {
          user: true,
        },
      },
      order: {
        views: sort,
      },
    })
  }

  async findAllByCat(cat_id: number, take?: number, skip?: number) {
    const takee = take || 10
    const skipp = skip || 0

    const coins = await this.coinRepo.findAndCount({
      where: {
        category: { id: cat_id },
      },
      relations: {
        category: true,
        cart: {
          user: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      take: takee,
      skip: skipp,
    })

    if (!coins)
      throw new NotFoundException(
        'В этой категории нет ни одной монеты. Мы скоро это исправим!',
      )

    return coins
  }

  async findAllByCart(cart_id: number) {
    await this.cartService.findCartById(cart_id)

    const coins = await this.coinRepo.find({
      where: {
        cart: { id: cart_id },
      },
      relations: {
        category: true,
        cart: {
          user: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    })

    return coins
  }

  async createCoin() {
    const categories = await this.catService.findAllCategory()

    if (!categories.length) {
      throw new NotFoundException(
        'У вас нет ни одной категории. Перейдите к созданию категорий!',
      )
    }

    return this.coinRepo.save({})
  }

  async updateCoin(dto: UpdateCoinDto, id: number, files?: FileDto) {
    const { category, ...data } = dto
    await this.findOneById(id)
    await this.catService.findOneCategory(category)
    if (Object?.keys(files).length) {
      const uploadedFiles = await this.fileService.uploadFile(files, 'coins')
      await this.coinRepo.update(id, {
        ...data,
        category: { id: category },
        frontImage: uploadedFiles.frontImageName,
        backImage: uploadedFiles.backImageName,
      })
      return await this.findOneById(id)
    }
    await this.coinRepo.update(id, {
      ...data,
      category: { id: category },
    })
    return await this.findOneById(id)
  }

  async deleteCoin(id: number) {
    await this.findOneById(id)

    return await this.coinRepo.delete(id)
  }

  async changeViews(id: number) {
    const coin = await this.findOneById(id)

    coin.views += 1

    const refreshCoin = await this.coinRepo.save(coin)

    return refreshCoin
  }

  async putCoinInCart(dto: PutCoinDto) {
    const cart = await this.cartService.create(dto.user_id)
    const user = await this.userService.findOneById(dto.user_id)

    if (!cart) {
      await this.coinRepo.update(dto.coin_id, {
        cart: { id: user.cart[0].id },
      })

      const refreshCoin = await this.findOneById(dto.coin_id)
      return refreshCoin
    }
    const refreshCoin = await this.coinRepo.update(dto.coin_id, {
      cart: { id: cart.id },
    })

    return refreshCoin
  }

  async deleteCoinFromCart(dto: DeleteCoinDto) {
    await this.cartService.findCartById(dto.cart_id)
    await this.userService.findOneById(dto.user_id)
    const coin = await this.findOneById(dto.coin_id)

    await this.coinRepo.update(dto.coin_id, {
      cart: null,
    })

    const refreshCoin = await this.findOneById(coin.id)

    return refreshCoin
  }

  async findSimilarCoins(coin_id: number) {
    const coin = await this.findOneById(coin_id)

    const qb = await this.coinRepo
      .createQueryBuilder('c')
      .where((qb) => {
        qb.where({ price: MoreThan(coin.price - 15) })
          .andWhere({
            price: LessThan(coin.price + 15),
          })
          .andWhere('c.id != :id', { id: coin_id })
          .andWhere('c.composition = :comp', { comp: coin.composition })
      })
      .limit(5)
      .getMany()

    return qb
  }
}
