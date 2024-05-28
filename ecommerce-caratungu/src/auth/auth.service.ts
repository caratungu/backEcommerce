import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/LoginUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  getAuth() {
    return 'Get auth';
  }
  
  userSignin(userInfo: LoginUserDto) {
    return this.usersService.loginUser(userInfo);
  }
}
