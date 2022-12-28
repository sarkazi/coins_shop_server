import { CartEntity } from 'src/cart/entities/cart.entity'
import { CategoryEntity } from 'src/catedories/entities/catedory.entity'
//import { Base } from 'src/utils/base'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('coins')
export class CoinEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  description?: string

  @Column({ name: 'issuing_country', nullable: true })
  issuingCountry?: string

  @Column({ nullable: true })
  composition?: string

  @Column({ nullable: true })
  quality?: string

  @Column({ nullable: true })
  denomination?: string

  @Column({ nullable: true })
  year?: number

  @Column({ nullable: true })
  weight?: string

  @Column({ nullable: true })
  price?: number

  @Column({ nullable: true, name: 'front_image' })
  frontImage?: string

  @Column({ nullable: true, name: 'back_image' })
  backImage?: string

  @Column({ default: 0 })
  views?: number

  @ManyToOne(() => CartEntity, (cart) => cart.coins)
  cart: CartEntity

  @ManyToOne(() => CategoryEntity, (category) => category.coins, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: CategoryEntity
}
