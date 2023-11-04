import { IsString, Length, IsEmail } from 'class-validator';
import { ClassConstructor } from 'class-transformer';
import { UserValidation as validation } from '../user.validation.js';

export function BaseUserDto<T extends ClassConstructor<object>>(DtoToExtend: T) {
  class ExtendedUserDto extends DtoToExtend {
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

  return ExtendedUserDto;
}
