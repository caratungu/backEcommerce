import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqLoginGuard } from 'src/guards/reqLogin.guard';
import { LoginUserDto } from './dtos/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  @UseGuards(ReqLoginGuard)
  userSignin(@Body() userInfo: LoginUserDto) {
    return this.authService.userSignin(userInfo);
  }
}
