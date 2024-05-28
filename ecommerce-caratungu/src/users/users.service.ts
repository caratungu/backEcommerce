import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LoginUserDto } from 'src/auth/dtos/LoginUser.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  createUser(user: CreateUserDto) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: CreateUserDto) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  loginUser(userInfo: LoginUserDto) {
    return this.usersRepository.loginUser(userInfo);
  }

  preloadUsers() {
    return this.usersRepository.preloadUsers();
  }
}
