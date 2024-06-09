import { Test } from '@nestjs/testing';
import { User } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('usersService', () => {
  let usersService: UsersService;

  const mockUser1: User = {
    id: '12a215f2-435a-47e6-a443-5a7dc38871de',
    email: 'example1@mail.com',
    name: 'Name Example1',
    password: 'Pass*123',
    address: 'Address example 1',
    phone: 5577889,
    country: 'Country example 1',
    city: 'City example 1',
    is_admin: false,
    orders: [],
  };

  const mockUser2: User = {
    id: '12a215f2-435a-47e6-a443-5a7dc38871df',
    email: 'example2@mail.com',
    name: 'Name Example2',
    password: 'Pass*123',
    address: 'Address example 2',
    phone: 5511554,
    country: 'Country example 2',
    city: 'City example 2',
    is_admin: false,
    orders: [],
  };

  beforeEach(async () => {
    const mockUsersRepository: Partial<UsersRepository> = {
      getUsers: async (page: number, limit: number) =>
        Promise.resolve([mockUser1, mockUser2]),

      getUserById: async (id: string) => Promise.resolve(mockUser1),

      getUserByEmail: async (email: string) => Promise.resolve(mockUser1),
    };

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('Crear una instancia de UsersService', () => {
    expect(usersService).toBeDefined();
  });

  it('Devuelve array de usuarios', async () => {
    const users = await usersService.getUsers(1, 5);
    expect(users).toEqual([mockUser1, mockUser2]);
  });

  it('Devuelve usuario por id', async () => {
    const user = await usersService.getUserById(mockUser1.id);
    expect(user).toEqual(mockUser1);
  });

  it('Devuelve usuario por email', async () => {
    const user = await usersService.getUserByEmail(mockUser1.email);
    expect(user).toEqual(mockUser1);
  });
});
