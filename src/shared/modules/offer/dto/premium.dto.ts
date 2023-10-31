import { IsString, IsEnum } from 'class-validator';
import { City, CityValue } from '../../../types/city.enum.js';
import { OfferValidation as validation } from './offer.validation.js';

export class PremiumDto {
  @IsString({ message: validation.city.message.format })
  @IsEnum(City, { message: validation.city.message.value })
  public city: CityValue;
}
