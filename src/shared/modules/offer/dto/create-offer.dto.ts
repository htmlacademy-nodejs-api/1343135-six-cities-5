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
  IsMongoId,
  IsDefined
} from 'class-validator';
import { CreateOfferValidation as validation } from './create-offer.validation.js';
import { CityValue, City } from '../../../types/city.enum.js';
import { Feature, FeatureValue } from '../../../types/feature.enum.js';
import { HousingType, HousingTypeValue } from '../../../types/housing-type.enum.js';
import { Location } from '../../../types/location.type.js';
import { CustomLocation } from './location.dto.js';

export class CreateOfferDto {
  @IsDefined()
  @IsString({ message: validation.title.message.format })
  @Length(
    validation.title.rule.minLength,
    validation.title.rule.maxLength,
    { message: validation.title.message.length }
  )
  public title?: string;

  @IsDefined()
  @IsString({ message: validation.description.message.format })
  @Length(
    validation.description.rule.minLength,
    validation.description.rule.maxLength,
    { message: validation.description.message.length }
  )
  public description: string;

  @IsDefined()
  @IsString({ message: validation.city.message.format })
  @IsEnum(City, { message: validation.city.message.value })
  public city: CityValue;

  @IsDefined()
  @IsString({ message: validation.preview.message.format })
  @IsUrl(undefined, { message: validation.preview.message.value })
  public preview: string;

  @IsDefined()
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

  @IsDefined()
  @IsBoolean({ message : validation.isPremium.message.format })
  public isPremium: boolean;

  @IsDefined()
  @IsString({ message: validation.housingType.message.format })
  @IsEnum(HousingType, { message: validation.housingType.message.value })
  public housingType: HousingTypeValue;

  @IsDefined()
  @IsInt({ message: validation.roomCount.message.format })
  @Min(validation.roomCount.rule.min, { message: validation.roomCount.message.value })
  @Max(validation.roomCount.rule.max, { message: validation.roomCount.message.value })
  public roomCount: number;

  @IsDefined()
  @IsInt({ message: validation.tenantCount.message.format })
  @Min(validation.tenantCount.rule.min, { message: validation.tenantCount.message.value })
  @Max(validation.tenantCount.rule.max, { message: validation.tenantCount.message.value })
  public tenantCount: number;

  @IsDefined()
  @IsInt({ message: validation.price.message.format })
  @Min(validation.price.rule.min, { message: validation.price.message.value })
  @Max(validation.price.rule.max, { message: validation.price.message.value })
  public price: number;

  @IsDefined()
  @IsArray({ message: validation.features.message.format })
  @ArrayMinSize(
    validation.features.rule.minLength,
    { message: validation.features.message.minLength }
  )
  @IsString({ each: true, message: validation.features.message.value })
  @IsEnum(Feature, { each: true, message: validation.features.message.value })
  public features: FeatureValue[];

  @IsDefined()
  @Validate(CustomLocation, { message: validation.location.message.format })
  public location: Location;

  @IsDefined()
  @IsMongoId({ message: validation.authorId.message.format })
  public authorId: string;
}
