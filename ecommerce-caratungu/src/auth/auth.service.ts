import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  getAuth() {
    return 'Get auth';
  }
  
  userSignin(userInfo: any) {
    return this.usersService.loginUser(userInfo);
  }
}
