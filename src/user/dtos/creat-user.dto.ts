// src/user/dto/create-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';

import { password, name, email, phone } from './creat-user-rules';

export class CreateUserDto {
  @IsNotEmpty(name.required)
  @IsString()
  name: string;

  @IsEmail({}, email.matchRegex)
  @IsNotEmpty(email.required)
  email: string;

  @IsNotEmpty(password.required)
  @IsStrongPassword(password.regex, password.matchRegex)
  password: string;

  @IsNotEmpty(phone.required)
  @IsPhoneNumber(null, phone.matchRegex)
  @IsString()
  phone: string;
}
