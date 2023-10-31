import { IsString, Length, IsEmail } from 'class-validator';
import { UserValidation as validation } from './user.validation.js';

export class BaseUserDto {
  @IsString({ message: validation.email.message.format })
  @IsEmail(undefined, { message: validation.email.message.value })
  public email: string;

  @IsString({ message: validation.password.message.format })
  @Length(
    validation.password.rule.minLength,
    validation.password.rule.maxLength,
    { message: validation.password.message.length }
  )
  public password: string;
}
