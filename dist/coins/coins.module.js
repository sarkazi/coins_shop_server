"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinsModule = void 0;
const common_1 = require("@nestjs/common");
const coins_service_1 = require("./coins.service");
const coins_controller_1 = require("./coins.controller");
const typeorm_1 = require("@nestjs/typeorm");
const coin_entity_1 = require("./entities/coin.entity");
const catedories_module_1 = require("../catedories/catedories.module");
const file_module_1 = require("../file/file.module");
const user_module_1 = require("../user/user.module");
const cart_module_1 = require("../cart/cart.module");
let CoinsModule = class CoinsModule {
};
CoinsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([coin_entity_1.CoinEntity]),
            catedories_module_1.CategoriesModule,
            file_module_1.FileModule,
            user_module_1.UserModule,
            cart_module_1.CartModule,
        ],
        controllers: [coins_controller_1.CoinsController],
        providers: [coins_service_1.CoinsService],
    })
], CoinsModule);
exports.CoinsModule = CoinsModule;
//# sourceMappingURL=coins.module.js.map