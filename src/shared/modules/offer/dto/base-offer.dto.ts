import {
  IsString,
  Length,
  IsEnum,
  IsUrl,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  IsInt,
  Min,
  Max,
  Validate,
} from 'class-validator';
import { OfferValidation as validation } from './offer.validation.js';
import { CityValue, City } from '../../../types/city.enum.js';
import { Feature, FeatureValue } from '../../../types/feature.enum.js';
import { HousingType, HousingTypeValue } from '../../../types/housing-type.enum.js';
import { Location } from '../../../types/location.type.js';
import { LocationValidator } from '../../../utils/validation.js';

export class BaseOfferDto {
  @IsString({ message: validation.title.message.format })
  @Length(
    validation.title.rule.minLength,
    validation.title.rule.maxLength,
    { message: validation.title.message.length }
  )
  public title: string;

  @IsString({ message: validation.description.message.format })
  @Length(
    validation.description.rule.minLength,
    validation.description.rule.maxLength,
    { message: validation.description.message.length }
  )
  public description: string;

  @IsString({ message: validation.city.message.format })
  @IsEnum(City, { message: validation.city.message.value })
  public city: CityValue;

  @IsString({ message: validation.preview.message.format })
  @IsUrl(undefined, { message: validation.preview.message.value })
  public preview: string;

  @IsArray({ message: validation.photos.message.format })
  @ArrayMinSize(
    validation.photos.rule.length,
    { message: validation.photos.message.length }
  )
  @ArrayMaxSize(
    validation.photos.rule.length,
    { message: validation.photos.message.length }
  )
  @IsUrl(undefined, { each: true, message: validation.photos.message.value })
  public photos: string[];

  @IsBoolean({ message : validation.isPremium.message.format })
  public isPremium: boolean;

  @IsString({ message: validation.housingType.message.format })
  @IsEnum(HousingType, { message: validation.housingType.message.value })
  public housingType: HousingTypeValue;

  @IsInt({ message: validation.roomCount.message.format })
  @Min(validation.roomCount.rule.min, { message: validation.roomCount.message.value })
  @Max(validation.roomCount.rule.max, { message: validation.roomCount.message.value })
  public roomCount: number;

  @IsInt({ message: validation.tenantCount.message.format })
  @Min(validation.tenantCount.rule.min, { message: validation.tenantCount.message.value })
  @Max(validation.tenantCount.rule.max, { message: validation.tenantCount.message.value })
  public tenantCount: number;

  @IsInt({ message: validation.price.message.format })
  @Min(validation.price.rule.min, { message: validation.price.message.value })
  @Max(validation.price.rule.max, { message: validation.price.message.value })
  public price: number;

  @IsArray({ message: validation.features.message.format })
  @ArrayMinSize(
    validation.features.rule.minLength,
    { message: validation.features.message.minLength }
  )
  @IsString({ each: true, message: validation.features.message.value })
  @IsEnum(Feature, { each: true, message: validation.features.message.value })
  public features: FeatureValue[];

  @Validate(LocationValidator, { message: validation.location.message.format })
  public location: Location;
}
