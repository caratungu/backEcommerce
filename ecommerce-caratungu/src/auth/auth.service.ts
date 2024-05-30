import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { Hash } from 'src/utils/hash';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginInfo: LoginUserDto) {
    const userByEmail = await this.usersService.getUserByEmail(loginInfo.email);
    console.log(userByEmail);
    
    if (!userByEmail) throw new BadRequestException('Credenciales inválidas');

    const isPassCorrect = await bcrypt.compare(
      loginInfo.password,
      userByEmail.password,
    );

    if (!isPassCorrect) throw new BadRequestException('Credenciales inválidas');

    const userPayload = {
      id: userByEmail.id,
      email: userByEmail.email,
      roles: [userByEmail.is_admin ? Role.ADMIN : Role.USER]
    };

    const token = this.jwtService.sign(userPayload);

    return ({succes: 'Acceso autorizado', token});
  }

  async signUp(userInfo: CreateUserDto) {
    const userByEmail = await this.usersService.getUserByEmail(userInfo.email);
    if (userByEmail) {
      throw new HttpException(
        'Ya existe un usuario registrado con ese email',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const passHashed = await Hash(userInfo.password);

      if (!passHashed) {
        throw new HttpException(
          'Error al hashear la password',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        return this.authRepository.signUp({
          ...userInfo,
          password: passHashed,
        });
      }
    }
  }
}
