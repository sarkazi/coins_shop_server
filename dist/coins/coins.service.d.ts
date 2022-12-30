import { CartService } from 'src/cart/cart.service';
import { CategoriesService } from 'src/catedories/catedories.service';
import { FileDto } from 'src/file/file.dto';
import { FileService } from 'src/file/file.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { DeleteCoinDto } from './dto/delete-coin.dto';
import { PutCoinDto } from './dto/put-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { CoinEntity } from './entities/coin.entity';
export declare class CoinsService {
    private readonly coinRepo;
    private readonly catService;
    private readonly fileService;
    private readonly userService;
    private readonly cartService;
    constructor(coinRepo: Repository<CoinEntity>, catService: CategoriesService, fileService: FileService, userService: UserService, cartService: CartService);
    findOneById(coin_id: number): Promise<CoinEntity>;
    findAll(sort?: 'ASC' | 'DESC', mainInfo?: string, country?: string, metal?: string, quality?: string, priceFrom?: string, priceTo?: string, yearFrom?: string, yearTo?: string): Promise<CoinEntity[]>;
    findAllByCat(cat_id: number, take?: string, skip?: string): Promise<[CoinEntity[], number]>;
    findAllByCart(cart_id: number): Promise<CoinEntity[]>;
    createCoin(): Promise<CoinEntity>;
    updateCoin(dto: UpdateCoinDto, id: number, files?: FileDto): Promise<CoinEntity>;
    deleteCoin(id: number): Promise<import("typeorm").DeleteResult>;
    changeViews(id: number): Promise<CoinEntity>;
    putCoinInCart(dto: PutCoinDto): Promise<CoinEntity | import("typeorm").UpdateResult>;
    deleteCoinFromCart(dto: DeleteCoinDto): Promise<CoinEntity>;
    findSimilarCoins(coin_id: number): Promise<CoinEntity[]>;
}
