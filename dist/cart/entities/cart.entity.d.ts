import { CoinEntity } from 'src/coins/entities/coin.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Base } from 'src/utils/base';
export declare class CartEntity extends Base {
    user: UserEntity;
    coins: CoinEntity[];
}
