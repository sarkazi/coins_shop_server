import { CartEntity } from 'src/cart/entities/cart.entity';
import { CategoryEntity } from 'src/catedories/entities/catedory.entity';
export declare class CoinEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name?: string;
    description?: string;
    issuingCountry?: string;
    composition?: string;
    quality?: string;
    denomination?: string;
    year?: number;
    weight?: string;
    price?: number;
    frontImage?: string;
    backImage?: string;
    views?: number;
    cart: CartEntity;
    category: CategoryEntity;
}
