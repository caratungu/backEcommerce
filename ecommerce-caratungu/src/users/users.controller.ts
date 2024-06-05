import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RestoreUserDto } from './dtos/RestoreUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.usersService.getUsers(Number(page), Number(limit));
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  // @Post()
  // createUser(@Body() user: CreateUserDto) {
  //   return this.usersService.createUser(user);
  // }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: CreateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Patch()
  restoreUser(@Body() infoToRestore: RestoreUserDto) {
    const { email, password, confirmPass } = infoToRestore;
    return this.usersService.restoreUser(email, password, confirmPass);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post('seeder')
  preloadUsers() {
    return this.usersService.preloadUsers();
  }
}
