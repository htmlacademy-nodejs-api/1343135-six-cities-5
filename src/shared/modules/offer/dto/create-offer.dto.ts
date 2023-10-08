import { CityValue } from '../../../types/city.enum.js';
import { FeatureValue } from '../../../types/feature.enum.js';
import { HousingTypeValue } from '../../../types/housing-type.enum.js';
import { Location } from '../../../types/location.type.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public datePublished: Date;
  public city: CityValue;
  public preview: string;
  public photos: string[];
  public isPremium: boolean;
  public rating: number;
  public housingType: HousingTypeValue;
  public roomCount: number;
  public tenantCount: number;
  public price: number;
  public features: FeatureValue[];
  public authorId: string;
  public location: Location;
}
