import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  createUser(user: Partial<User>) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: CreateUserDto) {
    if (user.password === user.confirmPass) {
      const { confirmPass, ...userToDB } = user;
      return this.usersRepository.updateUser(id, userToDB);
    } else {
      throw new BadRequestException('Error al validar las contraseñas ingresadas')
    }
  }

  restoreUser(email: string, password: string, confirmPass: string) {
    if (password === confirmPass) {
      return this.usersRepository.restoreUser(email, password);
    } else {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  preloadUsers() {
    return this.usersRepository.preloadUsers();
  }
}
