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
exports.CoinsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const coins_service_1 = require("./coins.service");
const update_coin_dto_1 = require("./dto/update-coin.dto");
const file_dto_1 = require("../file/file.dto");
const put_coin_dto_1 = require("./dto/put-coin.dto");
const delete_coin_dto_1 = require("./dto/delete-coin.dto");
let CoinsController = class CoinsController {
    constructor(coinsService) {
        this.coinsService = coinsService;
    }
    findAll(sort) {
        return this.coinsService.findAll(sort);
    }
    findOne(id) {
        return this.coinsService.findOneById(id);
    }
    findByCat(id, take, skip) {
        return this.coinsService.findAllByCat(id, +take, +skip);
    }
    findSimilar(id) {
        return this.coinsService.findSimilarCoins(id);
    }
    findByCart(id) {
        return this.coinsService.findAllByCart(id);
    }
    create() {
        return this.coinsService.createCoin();
    }
    putCoinCart(dto) {
        return this.coinsService.putCoinInCart(dto);
    }
    deleteFromCart(dto) {
        console.log(dto);
        return this.coinsService.deleteCoinFromCart(dto);
    }
    delete(id) {
        return this.coinsService.deleteCoin(id);
    }
    changeViews(id) {
        return this.coinsService.changeViews(id);
    }
    update(dto, id, files) {
        return this.coinsService.updateCoin(dto, id, files);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/by-cat/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "findByCat", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/similar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "findSimilar", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/by-cart/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "findByCart", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)('/put-coin-cart'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [put_coin_dto_1.PutCoinDto]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "putCoinCart", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)('/delete-from-cart'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_coin_dto_1.DeleteCoinDto]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "deleteFromCart", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "delete", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)('/change-views/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "changeViews", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'frontImage', maxCount: 1 },
        { name: 'backImage', maxCount: 1 },
    ])),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_coin_dto_1.UpdateCoinDto, Number, file_dto_1.FileDto]),
    __metadata("design:returntype", void 0)
], CoinsController.prototype, "update", null);
CoinsController = __decorate([
    (0, common_1.Controller)('coins'),
    __metadata("design:paramtypes", [coins_service_1.CoinsService])
], CoinsController);
exports.CoinsController = CoinsController;
//# sourceMappingURL=coins.controller.js.map