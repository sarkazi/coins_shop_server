import { Module } from '@nestjs/common'
import { CoinsService } from './coins.service'
import { CoinsController } from './coins.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoinEntity } from './entities/coin.entity'
import { CategoriesModule } from 'src/catedories/catedories.module'
import { FileModule } from 'src/file/file.module'
import { UserModule } from 'src/user/user.module'
import { CartModule } from 'src/cart/cart.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([CoinEntity]),
    CategoriesModule,
    FileModule,
    UserModule,
    CartModule,
  ],
  controllers: [CoinsController],
  providers: [CoinsService],
})
export class CoinsModule {}
