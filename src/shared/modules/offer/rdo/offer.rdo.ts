import { Expose, Type } from 'class-transformer';
import { OfferShortRdo } from './offer-short.rdo.js';
import { FeatureValue } from '../../../types/feature.enum.js';
import { Location } from '../../../types/location.type.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo extends OfferShortRdo {
  @Expose()
  public description: string;

  @Expose()
  public photos: string[];

  @Expose()
  public roomCount: number;

  @Expose()
  public tenantCount: number;

  @Expose()
  public features: FeatureValue[];

  @Expose()
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public location: Location;
}
