import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { users } from '../dB/usersDB';
import { LoginUserDto } from 'src/auth/dtos/LoginUser.dto';

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
      throw new HttpException(
        `No existen usuarios para mostrar en la página ${page}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return users.slice(start, end);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        orders: true,
      },
    });
    if (!user) {
      throw new HttpException(
        'No existe usuario con el ID especificado',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return user;
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: string, uUser: CreateUserDto) {
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
      await this.usersRepository.save(user);
      return { message: 'Usuario actualizado', id };
    }
    throw new HttpException(
      'No existe usuario con el ID especificado',
      HttpStatus.BAD_REQUEST,
    );
  }

  async deleteUser(id: string) {
    const userToDelete = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userToDelete) {
      throw new HttpException(
        'No existe usuario con el ID especificado',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.usersRepository.delete(
      await this.usersRepository.findOne({
        where: { id },
      }),
    );
    return `Usuario con id: ${id} eliminado`;
  }

  async loginUser(userInfo: LoginUserDto) {
    
    const userLogin = await this.usersRepository.findOne({
      where: {
        email: userInfo.email,
      },
      select: {
        name: true,
        password: true,
      }
    });
    if (userLogin) {
      if (userLogin.password === userInfo.password) {
        return `Login exitoso para el usuario ${userLogin.name}`;
      }
    }
    throw new HttpException(
      'Email o password incorrectos',
      HttpStatus.BAD_REQUEST,
    );
  }

  async preloadUsers() {
    const usersInDB: CreateUserDto[] = await this.usersRepository.find();
    if (usersInDB.length === 0) {
      for (const user of users) {
        await this.usersRepository.save(user);
      }
      return 'Precarga de usuarios realizada';
    }
    return 'Ya existen usuarios en la BD';
  }
}
