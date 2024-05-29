// import { PickType } from '@nestjs/swagger';
// import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

// export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']) {}