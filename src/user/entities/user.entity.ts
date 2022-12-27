import { CartEntity } from 'src/cart/entities/cart.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'

@Entity('users')
export class UserEntity extends Base {
  @Column()
  login: string

  @Column()
  password: string

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart: CartEntity[]

  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: boolean
}
