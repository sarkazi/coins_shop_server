import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(id: number): Promise<import("./entities/user.entity").UserEntity>;
    finAll(): Promise<import("./entities/user.entity").UserEntity[]>;
}
