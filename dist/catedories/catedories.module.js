"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const catedories_service_1 = require("./catedories.service");
const catedories_controller_1 = require("./catedories.controller");
const typeorm_1 = require("@nestjs/typeorm");
const catedory_entity_1 = require("./entities/catedory.entity");
const file_module_1 = require("../file/file.module");
let CategoriesModule = class CategoriesModule {
};
CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([catedory_entity_1.CategoryEntity]), file_module_1.FileModule],
        controllers: [catedories_controller_1.CategoriesController],
        providers: [catedories_service_1.CategoriesService],
        exports: [catedories_service_1.CategoriesService],
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;
//# sourceMappingURL=catedories.module.js.map