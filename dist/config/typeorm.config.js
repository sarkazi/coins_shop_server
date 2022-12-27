"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = void 0;
const cart_entity_1 = require("../cart/entities/cart.entity");
const catedory_entity_1 = require("../catedories/entities/catedory.entity");
const coin_entity_1 = require("../coins/entities/coin.entity");
const user_entity_1 = require("../user/entities/user.entity");
const getTypeOrmConfig = async (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [user_entity_1.UserEntity, coin_entity_1.CoinEntity, catedory_entity_1.CategoryEntity, cart_entity_1.CartEntity],
    synchronize: false,
});
exports.getTypeOrmConfig = getTypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map