import { CoinEntity } from 'src/coins/entities/coin.entity';
import { Base } from 'src/utils/base';
export declare class CategoryEntity extends Base {
    name?: string;
    description?: string;
    coins: CoinEntity[];
    imageUrl?: string;
}
