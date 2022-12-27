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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepo, userService, jwtService) {
        this.userRepo = userRepo;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async loginUser(dto) {
        const user = await this.validateUser(dto);
        const accessToken = await this.jwtService.signAsync({ id: user.id, username: user.login }, {
            expiresIn: '1h',
        });
        const refreshToken = await this.jwtService.signAsync({ id: user.id, username: user.login }, {
            expiresIn: '4h',
        });
        return Object.assign(Object.assign({}, user), { accessToken,
            refreshToken });
    }
    async registerUser(dto) {
        const user = await this.userService.findOneByLogin(dto.login);
        if (user)
            throw new common_1.ForbiddenException('Пользователь с таким логином уже зарегистрирован!');
        const salt = await (0, bcrypt_1.genSalt)(10);
        const hashPassword = await (0, bcrypt_1.hash)(dto.password, salt);
        const newUser = this.userRepo.create({
            login: dto.login,
            password: hashPassword,
        });
        const saveUser = await this.userRepo.save(newUser);
        const accessToken = await this.jwtService.signAsync({ id: saveUser.id }, {
            expiresIn: '1h',
        });
        const refreshToken = await this.jwtService.signAsync({ id: saveUser.id }, {
            expiresIn: '4h',
        });
        return Object.assign(Object.assign({}, saveUser), { accessToken,
            refreshToken });
    }
    async validateUser(dto) {
        const user = await this.userService.findOneByLogin(dto.login);
        if (!user)
            throw new common_1.ForbiddenException('Пользователь с таким логином не найден. Перейдите к регистрации!');
        const isValidPassword = await (0, bcrypt_1.compare)(dto.password, user.password);
        if (!isValidPassword)
            throw new common_1.UnauthorizedException('Неверный email или пароль!');
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map