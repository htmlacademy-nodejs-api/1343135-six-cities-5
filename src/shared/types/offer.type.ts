import { City } from './city.type-enum.js';
import { Feature } from './feature.type-enum.js';
import { HousingType } from './housingType.type-enum.js';

export type Offer = {
  title: string;
  description: string;
  datePublished: Date;
  city: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomCount: number;
  tenantCount: number;
  price: number;
  features: Feature[];
  authorId: string;
  location: [number, number];
}
