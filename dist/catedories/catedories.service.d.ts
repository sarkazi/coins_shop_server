/// <reference types="multer" />
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-catedory.dto';
import { CategoryEntity } from './entities/catedory.entity';
export declare class CategoriesService {
    private readonly catRepo;
    private readonly fileService;
    constructor(catRepo: Repository<CategoryEntity>, fileService: FileService);
    findOneCategory(cat_id: number): Promise<CategoryEntity>;
    findAllCategory(): Promise<CategoryEntity[]>;
    createCategory(): Promise<CategoryEntity>;
    updateCategory(cat_id: number, dto: UpdateCategoryDto, files?: Express.Multer.File[]): Promise<CategoryEntity>;
    deleteCategory(id: number): Promise<import("typeorm").DeleteResult>;
}
