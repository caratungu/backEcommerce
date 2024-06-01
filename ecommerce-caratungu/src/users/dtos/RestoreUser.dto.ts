import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RestoreUserDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'El correo electrónico no es válido',
    },
  )
  @ApiProperty({
    description: 'El email del usuario debe ser un email válido',
    example: 'example@mail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Última contraseña registrada',
    example: 'Pass*123',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Debe coincidir con el password proporcionado',
    example: 'Pass*123',
  })
  confirmPass: string;
}
