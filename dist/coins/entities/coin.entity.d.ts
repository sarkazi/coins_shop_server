import { CartEntity } from 'src/cart/entities/cart.entity';
import { CategoryEntity } from 'src/catedories/entities/catedory.entity';
import { Base } from 'src/utils/base';
export declare class CoinEntity extends Base {
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
