import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegUserDto } from './dto/reg-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepo;
    private readonly userService;
    private readonly jwtService;
    constructor(userRepo: Repository<UserEntity>, userService: UserService, jwtService: JwtService);
    loginUser(dto: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        login: string;
        password: string;
        cart: import("../cart/entities/cart.entity").CartEntity[];
        isAdmin: boolean;
        avatarUrl?: boolean;
    }>;
    registerUser(dto: RegUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        login: string;
        password: string;
        cart: import("../cart/entities/cart.entity").CartEntity[];
        isAdmin: boolean;
        avatarUrl?: boolean;
    }>;
    validateUser(dto: LoginUserDto): Promise<UserEntity>;
}
