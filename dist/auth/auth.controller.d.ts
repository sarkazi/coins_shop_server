import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegUserDto } from './dto/reg-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
        login: string;
        password: string;
        cart: import("../cart/entities/cart.entity").CartEntity[];
        isAdmin: boolean;
        avatarUrl?: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
        login: string;
        password: string;
        cart: import("../cart/entities/cart.entity").CartEntity[];
        isAdmin: boolean;
        avatarUrl?: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
