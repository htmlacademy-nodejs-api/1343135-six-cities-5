import { City } from '../../types/city.type-enum.js';
import { Feature } from '../../types/feature.type-enum.js';
import { HousingType } from '../../types/housing-type.type-enum.js';
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
      city: city as City,
      preview,
      photos: photos.split(';'),
      isPremium: booleanFromString(isPremium),
      isFavorite: booleanFromString(isFavorite),
      rating: Number(rating),
      housingType: housingType as HousingType,
      roomCount: Number(roomCount),
      tenantCount: Number(tenantCount),
      price: Number(price),
      features: features.split(';') as Feature[],
      authorId,
      location: location.split(';').map((item) => Number(item)) as Location,
    };

    return offer;
  }
}
