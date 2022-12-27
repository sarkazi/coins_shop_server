import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { CartEntity } from 'src/cart/entities/cart.entity'
import { CategoryEntity } from 'src/catedories/entities/catedory.entity'
import { CoinEntity } from 'src/coins/entities/coin.entity'
import { UserEntity } from 'src/user/entities/user.entity'

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [UserEntity, CoinEntity, CategoryEntity, CartEntity],
  synchronize: true,
})
