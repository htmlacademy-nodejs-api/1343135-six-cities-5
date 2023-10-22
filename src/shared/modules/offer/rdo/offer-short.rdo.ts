import { Expose } from 'class-transformer';
import { CityValue } from '../../../types/city.enum.js';
import { HousingTypeValue } from '../../../types/housing-type.enum.js';

export class OfferShortRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public city: CityValue;

  @Expose()
  public preview: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: HousingTypeValue;

  @Expose()
  public price: number;

  @Expose()
  public commentCount: number;
}
