/// <reference types="multer" />
import { CategoriesService } from './catedories.service';
import { UpdateCategoryDto } from './dto/update-catedory.dto';
export declare class CategoriesController {
    private readonly catedoriesService;
    constructor(catedoriesService: CategoriesService);
    findAll(): Promise<import("./entities/catedory.entity").CategoryEntity[]>;
    findOne(id: number): Promise<import("./entities/catedory.entity").CategoryEntity>;
    create(): Promise<import("./entities/catedory.entity").CategoryEntity>;
    update(dto: UpdateCategoryDto, id: number, files?: Express.Multer.File[]): Promise<import("./entities/catedory.entity").CategoryEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
