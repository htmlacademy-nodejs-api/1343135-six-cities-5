import { CityValue } from './city.enum.js';
import { FeatureValue } from './feature.enum.js';
import { HousingTypeValue } from './housing-type.enum.js';
import { Location } from './location.type.js';
import { UserTypeValue } from './user-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  city: CityValue;
  preview: string;
  photos: string[];
  isPremium: boolean;
  housingType: HousingTypeValue;
  roomCount: number;
  tenantCount: number;
  price: number;
  features: FeatureValue[];
  author: {
    name: string;
    email: string;
    password: string;
    type: UserTypeValue;
    avatar?: string;
  };
  location: Location;
}
