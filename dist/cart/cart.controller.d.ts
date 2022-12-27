import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(dto: CreateCartDto): Promise<import("./entities/cart.entity").CartEntity>;
    getAllCarts(): Promise<import("./entities/cart.entity").CartEntity[]>;
    getOneCart(id: number): Promise<import("./entities/cart.entity").CartEntity>;
}
