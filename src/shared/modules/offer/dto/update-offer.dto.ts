import { UseOptionalValidatorsOf } from '../../../utils/validation.js';
import { BaseOfferDto } from './base-offer.dto.js';

@UseOptionalValidatorsOf(
  BaseOfferDto,
  [
    'title',
    'description',
    'city',
    'preview',
    'photos',
    'isPremium',
    'housingType',
    'roomCount',
    'tenantCount',
    'price',
    'features',
    'location'
  ])
export class UpdateOfferDto extends BaseOfferDto {}
