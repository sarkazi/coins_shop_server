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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_service_1 = require("../cart/cart.service");
const catedories_service_1 = require("../catedories/catedories.service");
const file_service_1 = require("../file/file.service");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
const coin_entity_1 = require("./entities/coin.entity");
let CoinsService = class CoinsService {
    constructor(coinRepo, catService, fileService, userService, cartService) {
        this.coinRepo = coinRepo;
        this.catService = catService;
        this.fileService = fileService;
        this.userService = userService;
        this.cartService = cartService;
    }
    async findOneById(coin_id) {
        const coin = await this.coinRepo.findOne({
            where: {
                id: coin_id,
            },
            relations: {
                category: true,
                cart: {
                    user: true,
                },
            },
        });
        if (!coin)
            throw new common_1.NotFoundException('Монета не найдена');
        return coin;
    }
    async findAll(sort, mainInfo, country, metal, quality, priceFrom, priceTo, yearFrom, yearTo) {
        const qb = this.coinRepo
            .createQueryBuilder('c')
            .leftJoin('c.category', 'category')
            .leftJoin('c.cart', 'cart')
            .leftJoin('cart.user', 'user')
            .orderBy('c.views', sort)
            .select(['c', 'category', 'cart', 'user']);
        if (mainInfo) {
            const newMainInfo = decodeURIComponent(mainInfo);
            qb.andWhere('c.name like :name', {
                name: `%${newMainInfo}%`,
            }).orWhere('c.description like :description', {
                description: `%${newMainInfo}%`,
            });
        }
        if (country) {
            const newCountry = decodeURIComponent(country);
            qb.andWhere('c.issuingCountry = :country', {
                country: newCountry,
            });
        }
        if (metal) {
            const newMetal = decodeURIComponent(metal);
            qb.andWhere('c.composition = :metal', { metal: newMetal });
        }
        if (quality) {
            const newQuality = decodeURIComponent(quality);
            qb.andWhere('c.quality = :quality', { quality: newQuality });
        }
        if (priceTo && !priceFrom) {
            qb.andWhere({ price: (0, typeorm_2.LessThanOrEqual)(priceTo) });
        }
        if (priceFrom && !priceTo) {
            qb.andWhere({ price: (0, typeorm_2.MoreThanOrEqual)(priceFrom) });
        }
        if (priceFrom && priceTo) {
            qb.andWhere({ price: (0, typeorm_2.MoreThanOrEqual)(priceFrom) }).andWhere({
                price: (0, typeorm_2.LessThanOrEqual)(priceTo),
            });
        }
        if (yearTo && !yearFrom) {
            qb.andWhere({ year: (0, typeorm_2.LessThanOrEqual)(yearTo) });
        }
        if (yearFrom && !yearTo) {
            qb.andWhere({ year: (0, typeorm_2.MoreThanOrEqual)(yearFrom) });
        }
        if (yearFrom && yearTo) {
            qb.andWhere({ year: (0, typeorm_2.MoreThanOrEqual)(yearFrom) }).andWhere({
                year: (0, typeorm_2.LessThanOrEqual)(yearTo),
            });
        }
        return qb.getMany();
    }
    async findAllByCat(cat_id, take, skip) {
        const coins = await this.coinRepo.findAndCount({
            where: {
                category: { id: cat_id },
            },
            relations: {
                category: true,
                cart: {
                    user: true,
                },
            },
            order: {
                createdAt: 'DESC',
            },
            take: take && take === 'Все' ? null : +take,
            skip: skip && take === 'Все' ? null : +skip,
        });
        if (!coins)
            throw new common_1.NotFoundException('В этой категории нет ни одной монеты. Мы скоро это исправим!');
        return coins;
    }
    async findAllByCart(cart_id) {
        await this.cartService.findCartById(cart_id);
        const coins = await this.coinRepo.find({
            where: {
                cart: { id: cart_id },
            },
            relations: {
                category: true,
                cart: {
                    user: true,
                },
            },
            order: {
                createdAt: 'DESC',
            },
        });
        return coins;
    }
    async createCoin() {
        const categories = await this.catService.findAllCategory();
        if (!categories.length) {
            throw new common_1.NotFoundException('У вас нет ни одной категории. Перейдите к созданию категорий!');
        }
        return this.coinRepo.save({});
    }
    async updateCoin(dto, id, files) {
        const { category } = dto, data = __rest(dto, ["category"]);
        await this.findOneById(id);
        await this.catService.findOneCategory(category);
        if (Object === null || Object === void 0 ? void 0 : Object.keys(files).length) {
            const uploadedFiles = await this.fileService.uploadFile(files, 'coins');
            await this.coinRepo.update(id, Object.assign(Object.assign({}, data), { category: { id: category }, frontImage: uploadedFiles.frontImageName, backImage: uploadedFiles.backImageName }));
            return await this.findOneById(id);
        }
        await this.coinRepo.update(id, Object.assign(Object.assign({}, data), { category: { id: category } }));
        return await this.findOneById(id);
    }
    async deleteCoin(id) {
        await this.findOneById(id);
        return await this.coinRepo.delete(id);
    }
    async changeViews(id) {
        const coin = await this.findOneById(id);
        coin.views += 1;
        const refreshCoin = await this.coinRepo.save(coin);
        return refreshCoin;
    }
    async putCoinInCart(dto) {
        const cart = await this.cartService.create(dto.user_id);
        const user = await this.userService.findOneById(dto.user_id);
        if (!cart) {
            await this.coinRepo.update(dto.coin_id, {
                cart: { id: user.cart[0].id },
            });
            const refreshCoin = await this.findOneById(dto.coin_id);
            return refreshCoin;
        }
        const refreshCoin = await this.coinRepo.update(dto.coin_id, {
            cart: { id: cart.id },
        });
        return refreshCoin;
    }
    async deleteCoinFromCart(dto) {
        await this.cartService.findCartById(dto.cart_id);
        await this.userService.findOneById(dto.user_id);
        const coin = await this.findOneById(dto.coin_id);
        await this.coinRepo.update(dto.coin_id, {
            cart: null,
        });
        const refreshCoin = await this.findOneById(coin.id);
        return refreshCoin;
    }
    async findSimilarCoins(coin_id) {
        const coin = await this.findOneById(coin_id);
        const qb = await this.coinRepo
            .createQueryBuilder('c')
            .where((qb) => {
            qb.where({ price: (0, typeorm_2.MoreThan)(coin.price - 15) })
                .andWhere({
                price: (0, typeorm_2.LessThan)(coin.price + 15),
            })
                .andWhere('c.id != :id', { id: coin_id })
                .andWhere('c.composition = :comp', { comp: coin.composition });
        })
            .limit(5)
            .getMany();
        return qb;
    }
};
CoinsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coin_entity_1.CoinEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        catedories_service_1.CategoriesService,
        file_service_1.FileService,
        user_service_1.UserService,
        cart_service_1.CartService])
], CoinsService);
exports.CoinsService = CoinsService;
//# sourceMappingURL=coins.service.js.map