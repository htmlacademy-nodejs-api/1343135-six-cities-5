import { CityValue } from './city.enum.js';
import { FeatureValue } from './feature.enum.js';
import { HousingTypeValue } from './housing-type.enum.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  datePublished: Date;
  city: CityValue;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingTypeValue;
  roomCount: number;
  tenantCount: number;
  price: number;
  features: FeatureValue[];
  authorId: string;
  location: Location;
}
