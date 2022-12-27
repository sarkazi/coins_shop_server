import { CoinsService } from './coins.service';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { FileDto } from 'src/file/file.dto';
import { PutCoinDto } from './dto/put-coin.dto';
import { DeleteCoinDto } from './dto/delete-coin.dto';
export declare class CoinsController {
    private readonly coinsService;
    constructor(coinsService: CoinsService);
    findAll(sort?: 'ASC' | 'DESC'): Promise<import("./entities/coin.entity").CoinEntity[]>;
    findOne(id: number): Promise<import("./entities/coin.entity").CoinEntity>;
    findByCat(id: number, take?: string, skip?: string): Promise<[import("./entities/coin.entity").CoinEntity[], number]>;
    findSimilar(id: number): Promise<import("./entities/coin.entity").CoinEntity[]>;
    findByCart(id: number): Promise<import("./entities/coin.entity").CoinEntity[]>;
    create(): Promise<import("./entities/coin.entity").CoinEntity>;
    putCoinCart(dto: PutCoinDto): Promise<import("./entities/coin.entity").CoinEntity | import("typeorm").UpdateResult>;
    deleteFromCart(dto: DeleteCoinDto): Promise<import("./entities/coin.entity").CoinEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    changeViews(id: number): Promise<import("./entities/coin.entity").CoinEntity>;
    update(dto: UpdateCoinDto, id: number, files?: FileDto): Promise<import("./entities/coin.entity").CoinEntity>;
}
