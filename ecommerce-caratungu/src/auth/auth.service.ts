import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { Hash } from '../utils/hash';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles.enum';
import { User } from 'src/users/entities/users.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn({ email, password}): Promise<{succes: string, token: string}> {
    
    const userByEmail = await this.usersService.getUserByEmail(email);
    
    if (!userByEmail) throw new BadRequestException('Credenciales inválidas');
    
    const isPassCorrect = await bcrypt.compare(
      password,
      userByEmail.password,
    );

    if (!isPassCorrect) throw new BadRequestException('Credenciales inválidas');

    const userPayload = {
      id: userByEmail.id,
      email: userByEmail.email,
      roles: [userByEmail.is_admin ? Role.ADMIN : Role.USER]
    };

    const token = this.jwtService.sign(userPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return ({succes: 'Acceso autorizado', token});
  }

  async signUp(userInfo: CreateUserDto): Promise<Partial<User>> {
    if (userInfo.password === userInfo.confirmPass) {
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
          const { confirmPass, ...userToCreate } = userInfo
          return this.authRepository.signUp({
            ...userToCreate,
            password: passHashed,
          });
        }
      }
    } else {
      throw new BadRequestException('Error al validar las contraseñas ingresadas')
    }
  }
}
