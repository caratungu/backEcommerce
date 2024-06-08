import { Test } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';

describe('authRepository', () => {
  let authRepository: AuthRepository;

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
      createUser: (user: Partial<User>) =>
        Promise.resolve({
          ...user,
          is_admin: false,
          id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
        }),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthRepository,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  it('Crear una instancia de AuhtRepository', async () => {
    expect(authRepository).toBeDefined();
  });

  it('Asigna id al usuario creado', async() => {
    const user = await authRepository.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
  })
});
