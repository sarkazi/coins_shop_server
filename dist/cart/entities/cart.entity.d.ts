import { CoinEntity } from 'src/coins/entities/coin.entity';
import { UserEntity } from 'src/user/entities/user.entity';
export declare class CartEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
    coins: CoinEntity[];
}
