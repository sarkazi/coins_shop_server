import { CoinEntity } from 'src/coins/entities/coin.entity';
export declare class CategoryEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name?: string;
    description?: string;
    coins: CoinEntity[];
    imageUrl?: string;
}
