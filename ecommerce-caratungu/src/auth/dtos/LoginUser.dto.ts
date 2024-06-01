// import { PickType } from '@nestjs/swagger';
// import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Correo electrónico válido ingresado por el usuario durante el registro.',
    example: 'example@mail.com'
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Contraseña definida por el usuario durante el registro.',
    example: 'Pass*123'
  })
  password: string;
}

// export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']) {}