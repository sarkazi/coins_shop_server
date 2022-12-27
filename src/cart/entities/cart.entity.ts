import { CoinEntity } from 'src/coins/entities/coin.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Entity, ManyToOne, OneToMany } from 'typeorm'

@Entity('cart')
export class CartEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity

  @OneToMany(() => CoinEntity, (coin) => coin.cart)
  coins: CoinEntity[]
}
