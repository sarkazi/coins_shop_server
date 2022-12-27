import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { CartEntity } from './entities/cart.entity'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepo: Repository<CartEntity>,
    private readonly userService: UserService,
  ) {}

  async findCartById(id: number) {
    const cart = await this.cartRepo.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        coins: {
          category: true,
        },
      },
    })

    if (!cart) {
      throw new NotFoundException('Такой корзины не существует')
    }

    return cart
  }

  async create(user_id: number) {
    const isHaveCart = await this.userService.checkCart(user_id)

    if (!isHaveCart) {
      const cart = this.cartRepo.create({
        user: { id: user_id },
      })

      return await this.cartRepo.save(cart)
    }

    return null
  }

  async getAllCart() {
    return await this.cartRepo.find({
      relations: {
        user: true,
        coins: {
          category: true,
        },
      },
    })
  }
}
