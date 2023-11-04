import { IsOptional, Validate } from 'class-validator';
import { ClassConstructor } from 'class-transformer';
import { UserValidation as validation } from '../user.validation.js';
import { FileUrlValidator } from '../../../../utils/validation.js';

export function BaseAvatarDto<T extends ClassConstructor<object>>(DtoToExtend: T) {
  class ExtendedAvatarDto extends DtoToExtend {
    @IsOptional()
    @Validate(
      FileUrlValidator(validation.avatar.formats),
      { message: validation.avatar.message.value },
    )
    public avatar?: string;
  }

  return ExtendedAvatarDto;
}
