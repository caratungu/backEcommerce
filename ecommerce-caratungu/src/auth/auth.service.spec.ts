import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { Hash } from '../utils/hash';
import { ConfigModule } from '@nestjs/config';

describe('authService', () => {
  let authService: AuthService;

  const mockUser: Partial<User> = {
    email: 'example@example.com',
    name: 'User Test',
    password: 'Pass*123',
    address: '123 Elm St',
    phone: 555111222,
    country: 'USA',
    city: 'New York',
  };

  beforeEach(async () => {
    const mockUsersService: Partial<UsersService> = {
      getUserByEmail: async (email: string) =>
        Promise.resolve({
          id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
          email,
          password: await Hash(mockUser.password),
          is_admin: false,
        }),
    };

    const mockAuthRepository: Partial<AuthRepository> = {
      signUp: (userInfo: Partial<User>) =>
        Promise.resolve({
          email: userInfo.email,
          name: userInfo.name,
          address: userInfo.address,
          phone: userInfo.phone,
          country: userInfo.country,
          city: userInfo.city,
          id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
        }),
    };

    const module = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({
              isGlobal: true,
              envFilePath: '.env.test',
            }),
            JwtModule.register({
              secret: 'test-secret',
              signOptions: { expiresIn: '1h' },
            }),
          ],
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Crear una instancia de AuhtService', async () => {
    expect(authService).toBeDefined();
  });

  it('Valida el signin del usuario', async () => {
    const login = await authService.signIn({ email: mockUser.email, password: mockUser.password });
    expect(login.succes).toEqual("Acceso autorizado")
  });
});
