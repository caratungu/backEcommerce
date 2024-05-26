import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import IUserDto from './usersDto';
import { users } from '../dB/usersDB'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    const users = await this.usersRepository.find();
    const start = (page - 1) * limit;
    const end = start + limit;
    if (start >= users.length) {
      return 'No se encontraron usuarios';
    }
    return users.slice(start, end);
  }

  async getUserById(id: string) {
    const user = this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        orders: true,
      }
    });
    if (user) {
      return user;
    } else {
      // return 'No existe usuario con ese id';
    }
  }

  async createUser(user: IUserDto) {
    return await this.usersRepository.save(user);
  }

  async updateUser(id: string, uUser: IUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (user) {
      user.email = uUser.email;
      user.name = uUser.name;
      user.password = uUser.password;
      user.address = uUser.address;
      user.phone = uUser.phone;
      user.country = uUser.country;
      user.city = uUser.city;
    }
    await this.usersRepository.save(user);
    return { message: 'Usuario actualizado', id };
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(
      await this.usersRepository.findOne({
        where: { id },
      }),
    );
    return `Usuario con id: ${id} eliminado`;
  }

  async loginUser(userInfo) {
    const userLogin = await this.usersRepository.findOne({
      where: {
        email: userInfo.email,
      }
    })
    if (userLogin) {
      if (userLogin.password === userInfo.password) {
        return `Login exitoso para el usuario ${userLogin.name}`;
      }
    }
    return 'Email o password incorrectos';
  }

  async preloadUsers () {
    const usersInDB = await this.usersRepository.find();
    if (usersInDB.length === 0) {
      for (const user of users) {
        await this.usersRepository.save(user);
      }
      return 'Precarga de usuarios realizada';
    }
    return 'Ya existen usuarios en la BD'
  }
}
