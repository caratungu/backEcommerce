import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'El correo electrónico no es válido',
    },
  )
  email: string;

  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 carácteres' })
  name: string;

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
  password: string;

  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 carácteres' })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsOptional()
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 carácteres' })
  country?: string | undefined;

  @IsOptional()
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 carácteres' })
  city?: string | undefined;
}
