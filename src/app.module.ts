import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeOrmConfig } from './config/typeorm.config'
import { UserModule } from './user/user.module'
import { CoinsModule } from './coins/coins.module'
import { CategoriesModule } from './catedories/catedories.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { FileModule } from './file/file.module'
import { AuthModule } from './auth/auth.module'
import { path } from 'app-root-path'
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
    UserModule,
    CoinsModule,
    CategoriesModule,
    FileModule,
    AuthModule,
    CartModule,
  ],

  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class AppModule {}
