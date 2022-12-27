import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    findOneById(user_id: number): Promise<UserEntity>;
    findOneByLogin(login: string): Promise<UserEntity>;
    findOneUser(id: number): Promise<UserEntity>;
    findAllUsers(): Promise<UserEntity[]>;
    checkCart(user_id: number): Promise<boolean>;
}
