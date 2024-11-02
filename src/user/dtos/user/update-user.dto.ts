import { Exclude, Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { email, name, phone } from '../rules/user-rules';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsString(name.typeMatch)
  name?: string;

  @IsString()
  @IsOptional()
  @Transform(phone.format) 
  @IsPhoneNumber(null, phone.matchRegex)
  phone?: string;

  @Exclude()
  email?: string;

  @Exclude() 
  password?: string;
}
