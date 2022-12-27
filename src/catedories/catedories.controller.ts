import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/decorators/auth.decorator'
import { CategoriesService } from './catedories.service'
import { UpdateCategoryDto } from './dto/update-catedory.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly catedoriesService: CategoriesService) {}

  @HttpCode(200)
  @Get()
  findAll() {
    return this.catedoriesService.findAllCategory()
  }

  @HttpCode(200)
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.catedoriesService.findOneCategory(id)
  }

  @HttpCode(200)
//  @Auth('admin')
  @Post()
  create() {
    return this.catedoriesService.createCategory()
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
//  @Auth('admin')
  @Patch('/:id')
  update(
    @Body() dto: UpdateCategoryDto,
    @Param('id') id: number,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.catedoriesService.updateCategory(id, dto, files)
  }

  @HttpCode(200)
//  @Auth('admin')
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.catedoriesService.deleteCategory(id)
  }
}
