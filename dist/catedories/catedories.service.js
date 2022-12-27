"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const file_service_1 = require("../file/file.service");
const typeorm_2 = require("typeorm");
const catedory_entity_1 = require("./entities/catedory.entity");
let CategoriesService = class CategoriesService {
    constructor(catRepo, fileService) {
        this.catRepo = catRepo;
        this.fileService = fileService;
    }
    async findOneCategory(cat_id) {
        const cat = await this.catRepo.findOne({
            where: {
                id: cat_id,
            },
            relations: {
                coins: true,
            },
        });
        if (!cat)
            throw new common_1.NotFoundException('Категория не найдена!');
        return cat;
    }
    async findAllCategory() {
        return await this.catRepo.find({
            relations: {
                coins: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async createCategory() {
        return await this.catRepo.save({});
    }
    async updateCategory(cat_id, dto, files) {
        await this.findOneCategory(cat_id);
        await this.catRepo.update(cat_id, dto);
        return await this.findOneCategory(cat_id);
    }
    async deleteCategory(id) {
        await this.findOneCategory(id);
        return await this.catRepo.delete(id);
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(catedory_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=catedories.service.js.map