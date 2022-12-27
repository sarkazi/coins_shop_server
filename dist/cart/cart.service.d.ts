import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
export declare class CartService {
    private readonly cartRepo;
    private readonly userService;
    constructor(cartRepo: Repository<CartEntity>, userService: UserService);
    findCartById(id: number): Promise<CartEntity>;
    create(user_id: number): Promise<CartEntity>;
    getAllCart(): Promise<CartEntity[]>;
}
