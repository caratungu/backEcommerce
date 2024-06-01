import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqLoginGuard } from 'src/guards/reqLogin.guard';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SignUpInterceptor } from 'src/interceptors/signup.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(ReqLoginGuard)
  userSignin(@Body() loginInfo: LoginUserDto) {
    return this.authService.signIn(loginInfo);
  }

  @Post('signup')
  // @UseInterceptors(SignUpInterceptor)
  signUp(@Body() userInfo: CreateUserDto) {
    return this.authService.signUp(userInfo)
  }
}
