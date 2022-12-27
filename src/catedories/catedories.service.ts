import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileService } from 'src/file/file.service'
import { Repository } from 'typeorm'
import { UpdateCategoryDto } from './dto/update-catedory.dto'
import { CategoryEntity } from './entities/catedory.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly catRepo: Repository<CategoryEntity>,
    private readonly fileService: FileService,
  ) {}

  async findOneCategory(cat_id: number) {
    const cat = await this.catRepo.findOne({
      where: {
        id: cat_id,
      },
      relations: {
        coins: true,
      },
    })

    if (!cat) throw new NotFoundException('Категория не найдена!')

    return cat
  }

  async findAllCategory() {
    return await this.catRepo.find({
      relations: {
        coins: true,
      },
      order: {
        createdAt: 'DESC',
      },
    })
  }

  async createCategory() {
    return await this.catRepo.save({})
  }

  async updateCategory(
    cat_id: number,
    dto: UpdateCategoryDto,
    files?: Express.Multer.File[],
  ) {
    await this.findOneCategory(cat_id)

    // if (files) {
    //   const uploadedFiles = await this.fileService.uploadFile(files, 'category')

    //   await this.catRepo.update(cat_id, {
    //     name: dto.name,
    //     description: dto.description,
    //     imageUrl: uploadedFiles[0].url,
    //   })

    //   return await this.findOneCategory(cat_id)
    // }

    await this.catRepo.update(cat_id, dto)

    return await this.findOneCategory(cat_id)
  }

  async deleteCategory(id: number) {
    await this.findOneCategory(id)

    return await this.catRepo.delete(id)
  }
}
