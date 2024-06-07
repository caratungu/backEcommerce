import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { users } from '../dB/usersDB';
import { Hash } from '../utils/hash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        country: true,
        city: true,
        is_admin: true,
        orders: true,
      },
    });
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

  async getUserById(id: string): Promise<User> {
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

  async createUser(user: Partial<User>) {
    try {
      const userCreated = await this.usersRepository.save(user);
      const { password, ...userWithOutPass } = userCreated;
      return await this.usersRepository.save(userWithOutPass);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: string, uUser: Partial<User>): Promise<{ message: string, id: string}> {
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

  async restoreUser(email: string, password: string): Promise<{ message: string }> {
    const userToRestore = await this.usersRepository
      .createQueryBuilder('user')
      .withDeleted()
      .where('user.email = :email', { email })
      .andWhere('user.deleteDate IS NOT NULL')
      .select(['user.password', 'user.id'])
      .getOne();

    if (!userToRestore)
      throw new BadRequestException(
        'Credenciales inválidad, no es posible tramitar la restauración.',
      );

    if (await bcrypt.compare(password, userToRestore.password)) {
      await this.usersRepository.restore(userToRestore.id);
      return { message: `Usuario ${email} restablecido` };
    } else {
      throw new BadRequestException(
        'Credenciales inválidad, no es posible tramitar la restauración.',
      );
    }
  }

  async deleteUser(id: string): Promise<string> {
    const userToDelete = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userToDelete) {
      throw new HttpException(
        'No existe usuario con el ID especificado',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersRepository.softDelete(userToDelete.id);
    return `Usuario con id: ${id} eliminado`;
  }

  async getUserByEmail(email: string): Promise<Partial<User>> {
    const userByEmail = await this.usersRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        is_admin: true,
      },
    });
    return userByEmail;
  }

  async preloadUsers(): Promise<string> {
    const usersInDB: Partial<User>[] = await this.usersRepository.find();
    if (usersInDB.length === 0) {
      for (const user of users) {
        const passwordHashed = await Hash(user.password);
        await this.usersRepository.save({ ...user, password: passwordHashed });
      }
      return 'Precarga de usuarios realizada';
    }
    return 'Ya existen usuarios en la BD';
  }
}
