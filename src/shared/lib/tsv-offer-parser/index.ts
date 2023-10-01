import { CityValue } from '../../types/city.enum.js';
import { FeatureValue } from '../../types/feature.enum.js';
import { HousingTypeValue } from '../../types/housing-type.enum.js';
import { Location } from '../../types/location.type.js';
import { Offer } from '../../types/offer.type.js';
import { booleanFromString } from '../../utils/boolean-from-string.js';

export class TSVOfferParser {
  static parse(line: string) {
    const [
      title,
      description,
      datePublished,
      city,
      preview,
      photos,
      isPremium,
      isFavorite,
      rating,
      housingType,
      roomCount,
      tenantCount,
      price,
      features,
      authorId,
      location
    ] = line.trim().split('\t');

    const offer: Offer = {
      title,
      description,
      datePublished: new Date(datePublished),
      city: city as CityValue,
      preview,
      photos: photos.split(';'),
      isPremium: booleanFromString(isPremium),
      isFavorite: booleanFromString(isFavorite),
      rating: Number(rating),
      housingType: housingType as HousingTypeValue,
      roomCount: Number(roomCount),
      tenantCount: Number(tenantCount),
      price: Number(price),
      features: features.split(';') as FeatureValue[],
      authorId,
      location: location.split(';').map(Number) as Location,
    };

    return offer;
  }
}
