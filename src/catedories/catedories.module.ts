import { Module } from '@nestjs/common'
import { CategoriesService } from './catedories.service'
import { CategoriesController } from './catedories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from './entities/catedory.entity'
import { FileModule } from 'src/file/file.module'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), FileModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
