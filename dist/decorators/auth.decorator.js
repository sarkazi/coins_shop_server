"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../auth/guards/admin.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const Auth = (role) => (0, common_1.applyDecorators)(role ? (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.OnlyAdminGuard) : (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard));
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map