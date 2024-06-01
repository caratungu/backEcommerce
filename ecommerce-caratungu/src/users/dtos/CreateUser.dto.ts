import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 carácteres' })
  @ApiProperty({
    description: 'El nombre del usuario debe tener como mínimo 3 carácteres',
    example: 'John Doe'
  })
  name: string;

  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'El correo electrónico no es válido',
    },  
  )  
  @ApiProperty({
    description: 'El email del usuario debe ser un email válido',
    example: 'example@mail.com'
  })  
  email: string;

  @MaxLength(15, {
    message: 'La longitud máxima permitida es de 15 carcácteres',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un símbolo.',
    },
  )
  @ApiProperty({
    description: 'La contraseña debe tener al menos 8 caracteres y máximo 15, incluyendo una letra mayúscula, una letra minúscula, un número y un símbolo.',
    example: 'Pass*123'
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Debe coincidir con el password proporcionado',
    example: 'Pass*123'
  })
  confirmPass: string;

  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 carácteres' })
  @ApiProperty({
    description: 'La dirección del usuario debe tener como mínimo 3 carácteres y no exceder los 80.',
    example: '606 Beech St'
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'El teléfono del usuario debe ser un valor numércio de máximo 9 dígitos',
    example: 123456789
  })
  phone: number;

  @IsOptional()
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 carácteres' })
  @ApiProperty({
    description: 'El nombre del país debe tener como mínimo 5 carácteres y no exceder los 20.',
    example: 'Colombia'
  })
  country?: string | undefined;

  @IsOptional()
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 carácteres' })
  @ApiProperty({
    description: 'El nombre de la ciudad debe tener como mínimo 5 carácteres y no exceder los 20.',
    example: 'Bogotá'
  })
  city?: string | undefined;
}
