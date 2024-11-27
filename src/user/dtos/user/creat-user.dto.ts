
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';

import { password, name, email, phone } from '../rules/user-rules';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty(name.required)
  name: string;

  @IsEmail({}, email.matchRegex)
  @IsNotEmpty(email.required)
  email: string;

  @IsString()
  @IsNotEmpty(password.required)
  @IsStrongPassword(password.regex, password.matchRegex)
  password: string;

  @IsString()
  @IsNotEmpty(phone.required)
  @IsPhoneNumber(null, phone.matchRegex)
  phone: string;
}
