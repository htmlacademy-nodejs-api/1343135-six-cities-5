import { MockServerData } from '../../types/mock-server-data.type.js';
import { getRandomBoolean, getRandomNumber, getRandomItem, getRandomChunk } from '../../utils/random.js';
import { OfferValidation } from '../../modules/offer/dto/offer.validation.js';

export class TSVOfferGenerator {
  static generate(serverMock: MockServerData) {
    const title = getRandomItem(serverMock.title);
    const description = getRandomItem(serverMock.description);
    const city = getRandomItem(serverMock.city);
    const preview = getRandomItem(serverMock.preview);
    const photos = getRandomChunk(
      serverMock.photos,
      OfferValidation.photos.rule.length,
    ).join(';');
    const isPremium = getRandomBoolean();
    const housingType = getRandomItem(serverMock.housingType);
    const roomCount = getRandomNumber(
      OfferValidation.roomCount.rule.min,
      OfferValidation.roomCount.rule.max,
    );
    const tenantCount = getRandomNumber(
      OfferValidation.tenantCount.rule.min,
      OfferValidation.tenantCount.rule.max,
    );
    const price = getRandomNumber(
      OfferValidation.price.rule.min,
      OfferValidation.price.rule.max,
    );
    const features = getRandomChunk(serverMock.feature).join(';');
    const author = getRandomItem(serverMock.users).join(';');
    const location = getRandomItem(serverMock.location).map(String).join(';');

    return [
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
      author,
      location
    ].join('\t').concat('\n');
  }
}
