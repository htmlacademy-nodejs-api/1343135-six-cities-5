import { CityValue } from './city.enum.js';
import { FeatureValue } from './feature.enum.js';
import { HousingTypeValue } from './housing-type.enum.js';
import { Location } from './location.type.js';
import { UserTypeValue } from './user-type.enum.js';

export type MockServerData = {
  title: string[],
  description: string[],
  datePublished: {
    start: string;
    end: string;
  },
  city: CityValue[];
  preview: string[];
  photos: string[];
  housingType: HousingTypeValue[];
  feature: FeatureValue[];
  users: [string, string, string, UserTypeValue | '', string][];
  location: Location[];
}
