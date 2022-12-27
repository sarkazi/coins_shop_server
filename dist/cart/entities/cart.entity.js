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
exports.CartEntity = void 0;
const coin_entity_1 = require("../../coins/entities/coin.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const base_1 = require("../../utils/base");
const typeorm_1 = require("typeorm");
let CartEntity = class CartEntity extends base_1.Base {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.cart),
    __metadata("design:type", user_entity_1.UserEntity)
], CartEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coin_entity_1.CoinEntity, (coin) => coin.cart),
    __metadata("design:type", Array)
], CartEntity.prototype, "coins", void 0);
CartEntity = __decorate([
    (0, typeorm_1.Entity)('cart')
], CartEntity);
exports.CartEntity = CartEntity;
//# sourceMappingURL=cart.entity.js.map