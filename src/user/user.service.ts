import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOneById(user_id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: user_id,
      },
      relations: {
        cart: {
          coins: true,
        },
      },
    })

    if (!user) throw new NotFoundException('Пользователь не найден')

    return user
  }

  async findOneByLogin(login: string) {
    const user = await this.userRepo.findOne({
      where: {
        login,
      },
      relations: {
        cart: {
          coins: true,
        },
      },
    })

    return user
  }

  async findOneUser(id: number) {
    return await this.findOneById(id)
  }

  async findAllUsers() {
    return await this.userRepo.find()
  }

  async checkCart(user_id: number) {
    const user = await this.findOneById(user_id)

    if (!user.cart.length) {
      return false
    }
    return true
  }
}
