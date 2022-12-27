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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinEntity = void 0;
const cart_entity_1 = require("../../cart/entities/cart.entity");
const catedory_entity_1 = require("../../catedories/entities/catedory.entity");
const base_1 = require("../../utils/base");
const typeorm_1 = require("typeorm");
let CoinEntity = class CoinEntity extends base_1.Base {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CoinEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CoinEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issuing_country', nullable: true }),
    __metadata("design:type", String)
], CoinEntity.prototype, "issuingCountry", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CoinEntity.prototype, "composition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CoinEntity.prototype, "quality", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CoinEntity.prototype, "denomination", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CoinEntity.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CoinEntity.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CoinEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'front_image' }),
    __metadata("design:type", String)
], CoinEntity.prototype, "frontImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'back_image' }),
    __metadata("design:type", String)
], CoinEntity.prototype, "backImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CoinEntity.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_entity_1.CartEntity, (cart) => cart.coins),
    __metadata("design:type", cart_entity_1.CartEntity)
], CoinEntity.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catedory_entity_1.CategoryEntity, (category) => category.coins, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", catedory_entity_1.CategoryEntity)
], CoinEntity.prototype, "category", void 0);
CoinEntity = __decorate([
    (0, typeorm_1.Entity)('coins')
], CoinEntity);
exports.CoinEntity = CoinEntity;
//# sourceMappingURL=coin.entity.js.map