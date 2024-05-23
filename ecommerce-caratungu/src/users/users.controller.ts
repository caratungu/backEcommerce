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
    return this.usersService.getUserById(Number(id));
  }
  
  @Post()
  @UseGuards(ReqUserGuard)
  createUser(@Body() user: Omit<User, 'id'>) {
    return this.usersService.createUser(user);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard)
  @UseGuards(ReqUserGuard)
  updateUser(@Param('id') id: string, @Body() user: Omit<User, 'id'>) {
    return this.usersService.updateUser(Number(id), user);
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
