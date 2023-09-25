import { MockServerData } from '../../types/mock-server-data.type.js';
import { getRandomBoolean, getRandomDate, getRandomNumber, getRandomItem, getRandomChunk } from '../../utils/random.js';

export class TSVOfferGenerator {
  static generate(serverMock: MockServerData) {
    const title = getRandomItem(serverMock.title);
    const description = getRandomItem(serverMock.description);
    const datePublished = getRandomDate(
      new Date(serverMock.datePublished.start),
      new Date(serverMock.datePublished.end),
    );
    const city = getRandomItem(serverMock.city);
    const preview = getRandomItem(serverMock.preview);
    const photos = getRandomChunk(serverMock.photos, 6).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = getRandomNumber(1, 5, 1);
    const housingType = getRandomItem(serverMock.housingType);
    const roomCount = getRandomNumber(1, 8);
    const tenantCount = getRandomNumber(1, 10);
    const price = getRandomNumber(100, 100000);
    const features = getRandomChunk(serverMock.feature).join(';');
    const authorId = getRandomItem(serverMock.authorId);
    const location = getRandomItem(serverMock.location).map(String).join(';');

    return [
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
    ].join('\t').concat('\n');
  }
}
