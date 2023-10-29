import {
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
  isURL
} from 'class-validator';
import { UserValidation } from './user.validation.js';

@ValidatorConstraint({ name: 'avatar', async: false })
export class Avatar implements ValidatorConstraintInterface {
  validate(value: unknown, _args: ValidationArguments) {
    if (
      typeof value === 'string' &&
      isURL(value) &&
      UserValidation.avatar.formats.some((format) => value.endsWith(format))
    ) {
      return true;
    }

    return false;
  }


  defaultMessage(_args: ValidationArguments) {
    return '"$value" is not a valid avatar url';
  }
}
