import { Injectable } from "@nestjs/common";
import { users } from "src/dB/usersDB";


@Injectable()
export class UsersRepository {
    async getUsers() {
        return users;
    }
}