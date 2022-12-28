import { CartEntity } from 'src/cart/entities/cart.entity';
export declare class UserEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    login: string;
    password: string;
    cart: CartEntity[];
    isAdmin: boolean;
    avatarUrl?: boolean;
}
