import { CoinEntity } from 'src/coins/entities/coin.entity'
//import { Base } from 'src/utils/base'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('category')
export class CategoryEntity {
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

  @OneToMany(() => CoinEntity, (coins) => coins.category, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  coins: CoinEntity[]

  @Column({ nullable: true, name: 'image_url' })
  imageUrl?: string
}
