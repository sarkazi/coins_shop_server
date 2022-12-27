import { CartEntity } from 'src/cart/entities/cart.entity';
import { Base } from 'src/utils/base';
export declare class UserEntity extends Base {
    login: string;
    password: string;
    cart: CartEntity[];
    isAdmin: boolean;
    avatarUrl?: boolean;
}
