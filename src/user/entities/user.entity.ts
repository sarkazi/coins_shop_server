import { CartEntity } from 'src/cart/entities/cart.entity'
//import { Base } from 'src/utils/base'
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date

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
