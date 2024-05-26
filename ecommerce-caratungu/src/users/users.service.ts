import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';
import IUserDto from './usersDto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }
  
  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  createUser(user: IUserDto) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: IUserDto) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  loginUser(userInfo) {
    return this.usersRepository.loginUser(userInfo);
  }

  preloadUsers() {
    return this.usersRepository.preloadUsers();
  }
}
