// src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Forneça um e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'A senha deve ter no mínimo 6 caracteres, contendo letras e números',
  })
  password: string;

  @IsNotEmpty({ message: 'O número de telefone é obrigatório' })
  @MinLength(11, { message: 'O número de telefone deve ter no mínimo 11 dígitos' })
  @IsString()
  phone: string;
}
