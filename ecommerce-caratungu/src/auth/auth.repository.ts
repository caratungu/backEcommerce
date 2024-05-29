import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthRepository {
    constructor(private readonly usersService: UsersService) {}

    async signUp (userInfo: CreateUserDto) {
        return this.usersService.createUser(userInfo);
    }
}