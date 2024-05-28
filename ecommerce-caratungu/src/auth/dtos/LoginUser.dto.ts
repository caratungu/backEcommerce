import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail(
    {},
    {
      message: 'El correo electrónico no es válido',
    },
  )
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
  password: string;
}
