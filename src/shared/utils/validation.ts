import {
  IsOptional,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
  isLatitude,
  isLongitude,
  isURL,
} from 'class-validator';
import { ClassConstructor } from 'class-transformer';

type ClassProperty<T> = {
  [k in keyof T]: k extends string ? k : never
}[keyof T]

export function UseOptionalValidatorsOf<T, K extends ClassProperty<T>>(
  _baseClass: ClassConstructor<T>,
  optionalProperties: K[]
): ClassDecorator {
  return function decorator(baseClass) {
    for (const propertyKey of optionalProperties) {
      IsOptional()({constructor: baseClass.prototype.constructor}, propertyKey);
    }

    return baseClass;
  };
}

@ValidatorConstraint({ name: 'location', async: false })
export class LocationValidator implements ValidatorConstraintInterface {
  validate(value: unknown, _args: ValidationArguments) {
    return Array.isArray(value) &&
      value.length === 2 &&
      isLatitude(value[0]) &&
      isLongitude(value[1]);
  }

  defaultMessage(_args: ValidationArguments) {
    return '"$value" is not valid coordinates';
  }
}

export function FileUrlValidator(formats: readonly string[]) {
  @ValidatorConstraint({ name: 'file-url', async: false })
  class IsValidFileUrl implements ValidatorConstraintInterface {
    validate(value: unknown, _args: ValidationArguments) {
      return typeof value === 'string' &&
        isURL(value) &&
        formats.some((format) => value.endsWith(format));
    }

    defaultMessage(_args: ValidationArguments) {
      return '"$value" is not a valid file url';
    }
  }

  return IsValidFileUrl;
}

