import { IsString, Length, IsOptional, IsEnum, Validate } from 'class-validator';
import { BaseUserDto } from './base-user.dto.js';
import { UserValidation as validation } from './user.validation.js';
import { UserType, UserTypeValue } from '../../../types/user-type.enum.js';
import { FileUrlValidator } from '../../../utils/validation.js';

export class CreateUserDto extends BaseUserDto {
  @IsString({ message: validation.name.message.format })
  @Length(
    validation.name.rule.minLength,
    validation.name.rule.maxLength,
    { message: validation.name.message.length }
  )
  public name: string;

  @IsString({ message: validation.type.message.format })
  @IsEnum(UserType, { message: validation.type.message.value })
  public type: UserTypeValue;

  @IsOptional()
  @Validate(
    FileUrlValidator(validation.avatar.formats),
    { message: validation.avatar.message.value },
  )
  public avatar?: string;
}
