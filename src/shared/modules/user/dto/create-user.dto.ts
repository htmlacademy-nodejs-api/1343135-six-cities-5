import { IsString, Length, IsEnum } from 'class-validator';
import { BaseUserDto } from './base/base-user.dto.js';
import { UserValidation as validation } from './user.validation.js';
import { UserType, UserTypeValue } from '../../../types/user-type.enum.js';
import { BaseAvatarDto } from './base/base-avatar.dto.js';

class AdditionalDto {
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
}

export class CreateUserDto extends BaseAvatarDto(BaseUserDto(AdditionalDto)) {}
