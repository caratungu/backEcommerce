import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Get auth';
  }
  
  userSignin(userInfo: any) {
    return this.usersRepository.loginUser(userInfo);
  }
}
