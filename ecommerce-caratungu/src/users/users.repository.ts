import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { users } from '../dB/usersDB';
import { LoginUserDto } from 'src/auth/dtos/LoginUser.dto';
import { Hash } from 'src/utils/hash';

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
      const userCreated = await this.usersRepository.save(user);
      const { password, ...userWithOutPass } = userCreated;
      return await this.usersRepository.save(userWithOutPass);
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

  async getUserByEmail(email: string) {
    
    const userByEmail = await this.usersRepository.findOne({
      where: {
        email,
      }, select: {
        password: true,
      }
    });
    return userByEmail;
  }

  async preloadUsers() {
    const usersInDB: CreateUserDto[] = await this.usersRepository.find();
    if (usersInDB.length === 0) {
      for (const user of users) {
        const passwordHashed = await Hash(user.password)
        await this.usersRepository.save({ ...user, password:passwordHashed});
      }
      return 'Precarga de usuarios realizada';
    }
    return 'Ya existen usuarios en la BD';
  }
}
