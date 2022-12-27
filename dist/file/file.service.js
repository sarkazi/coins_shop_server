"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
let FileService = class FileService {
    async uploadFile(files, route = 'default') {
        const pathFile = `${app_root_path_1.path}/uploads/${route}`;
        await (0, fs_extra_1.ensureDir)(pathFile);
        await (0, fs_extra_1.writeFile)(`${pathFile}/${files.frontImage[0].originalname}`, files.frontImage[0].buffer);
        await (0, fs_extra_1.writeFile)(`${pathFile}/${files.backImage[0].originalname}`, files.backImage[0].buffer);
        return {
            frontImageUrl: `uploads/${route}/${files.frontImage[0].originalname}`,
            frontImageName: files.frontImage[0].originalname,
            backImageUrl: `uploads/${route}/${files.backImage[0].originalname}`,
            backImageName: files.backImage[0].originalname,
        };
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map