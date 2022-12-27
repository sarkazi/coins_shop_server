"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetJwtConfig = void 0;
const GetJwtConfig = async (configService) => ({
    secret: configService.get('JWT_SECRET'),
});
exports.GetJwtConfig = GetJwtConfig;
//# sourceMappingURL=jwt.config.js.map