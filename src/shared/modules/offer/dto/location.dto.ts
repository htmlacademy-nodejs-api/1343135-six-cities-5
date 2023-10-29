import {
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
  isLatitude,
  isLongitude,
} from 'class-validator';

@ValidatorConstraint({ name: 'location', async: false })
export class CustomLocation implements ValidatorConstraintInterface {
  validate(value: unknown, _args: ValidationArguments) {
    if (
      Array.isArray(value) &&
      value.length === 2 &&
      isLatitude(value[0]) &&
      isLongitude(value[1])
    ) {
      return true;
    }

    return false;
  }

  defaultMessage(_args: ValidationArguments) {
    return '"$value" is not a valid coordinates';
  }
}
