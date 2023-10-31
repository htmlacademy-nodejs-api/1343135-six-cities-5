import { IsMongoId } from 'class-validator';
import { BaseOfferDto } from './base-offer.dto.js';
import { OfferValidation as validation } from './offer.validation.js';

export class CreateOfferDto extends BaseOfferDto {
  @IsMongoId({ message: validation.authorId.message.format })
  public authorId: string;
}
