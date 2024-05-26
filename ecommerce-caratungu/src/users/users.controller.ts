import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { ReqUserGuard } from 'src/guards/reqUser.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import IUserDto from './usersDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: string = '1', @Query('limit') limit: string = '5') {
    return this.usersService.getUsers(Number(page), Number(limit));
  }
  
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
  
  @Post()
  @UseGuards(ReqUserGuard)
  createUser(@Body() user: IUserDto) {
    return this.usersService.createUser(user);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard)
  @UseGuards(ReqUserGuard)
  updateUser(@Param('id') id: string, @Body() user: IUserDto) {
    return this.usersService.updateUser(id, user);
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post('seeder')
  preloadUsers() {
    return this.usersService.preloadUsers();
  }
}
