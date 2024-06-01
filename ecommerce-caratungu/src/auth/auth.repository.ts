import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthRepository {
    constructor(private readonly usersService: UsersService) {}

    async signUp (userInfo: Partial<User>) {
        const userCreated = await this.usersService.createUser(userInfo);
        const { is_admin, ...user } = userCreated;
        return user;
    }
}