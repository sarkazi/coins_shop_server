import { CoinEntity } from 'src/coins/entities/coin.entity'
import { UserEntity } from 'src/user/entities/user.entity'
//import { Base } from 'src/utils/base'
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date

  @ManyToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity

  @OneToMany(() => CoinEntity, (coin) => coin.cart)
  coins: CoinEntity[]
}
