import { CityValue } from '../../types/city.enum.js';
import { FeatureValue } from '../../types/feature.enum.js';
import { HousingTypeValue } from '../../types/housing-type.enum.js';
import { Location } from '../../types/location.type.js';
import { Offer } from '../../types/offer.type.js';
import { UserTypeValue } from '../../types/user-type.enum.js';
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
      rating,
      housingType,
      roomCount,
      tenantCount,
      price,
      features,
      userString,
      location
    ] = line.trim().split('\t');

    const userArray = userString.split(';');
    const user = {
      name: userArray[0],
      email: userArray[1],
      password: userArray[2],
      ...(userArray[3] ? { type: (userArray[3] as UserTypeValue) } : null),
      ...(userArray[4] ? { avatar: userArray[4] } : null),
    };

    const offer: Offer = {
      title,
      description,
      datePublished: new Date(datePublished),
      city: city as CityValue,
      preview,
      photos: photos.split(';'),
      isPremium: booleanFromString(isPremium),
      rating: Number(rating),
      housingType: housingType as HousingTypeValue,
      roomCount: Number(roomCount),
      tenantCount: Number(tenantCount),
      price: Number(price),
      features: features.split(';') as FeatureValue[],
      user,
      location: location.split(';').map(Number) as Location,
    };

    return offer;
  }
}
