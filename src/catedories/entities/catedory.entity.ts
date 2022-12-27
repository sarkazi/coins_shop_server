import { CoinEntity } from 'src/coins/entities/coin.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity('category')
export class CategoryEntity extends Base {
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
