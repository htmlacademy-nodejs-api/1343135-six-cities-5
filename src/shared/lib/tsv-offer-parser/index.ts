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
      city,
      preview,
      photos,
      isPremium,
      housingType,
      roomCount,
      tenantCount,
      price,
      features,
      authorString,
      location
    ] = line.trim().split('\t');

    const authorArray = authorString.split(';');
    const author = {
      name: authorArray[0],
      email: authorArray[1],
      password: authorArray[2],
      ...(authorArray[3] ? { type: (authorArray[3] as UserTypeValue) } : null),
      ...(authorArray[4] ? { avatar: authorArray[4] } : null),
    };

    const offer: Offer = {
      title,
      description,
      city: city as CityValue,
      preview,
      photos: photos.split(';'),
      isPremium: booleanFromString(isPremium),
      housingType: housingType as HousingTypeValue,
      roomCount: Number(roomCount),
      tenantCount: Number(tenantCount),
      price: Number(price),
      features: features.split(';') as FeatureValue[],
      author,
      location: location.split(';').map(Number) as Location,
    };

    return offer;
  }
}
