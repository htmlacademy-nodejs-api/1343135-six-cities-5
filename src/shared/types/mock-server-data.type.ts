import { City } from './city.type-enum.js';
import { Feature } from './feature.type-enum.js';
import { HousingType } from './housingType.type-enum.js';
import { Location } from './location.type.js';

export type MockServerData = {
  title: string[],
  description: string[],
  datePublished: {
    start: string;
    end: string;
  },
  city: City[];
  preview: string[];
  photos: string[];
  housingType: HousingType[];
  feature: Feature[];
  authorId: string[];
  location: Location[];
}
