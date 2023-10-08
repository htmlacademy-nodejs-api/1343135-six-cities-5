import { MockServerData } from '../../types/mock-server-data.type.js';
import { getRandomBoolean, getRandomDate, getRandomNumber, getRandomItem, getRandomChunk } from '../../utils/random.js';

const PHOTO_COUNT = 6;

const RATING_MIN = 1;
const RATING_MAX = 5;
const RATING_PRECISION = 1;

const ROOM_COUNT_MIN = 1;
const ROOM_COUNT_MAX = 8;

const TENANT_COUNT_MIN = 1;
const TENANT_COUNT_MAX = 10;

const PRICE_MIN = 100;
const PRICE_MAX = 100000;

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
    const photos = getRandomChunk(serverMock.photos, PHOTO_COUNT).join(';');
    const isPremium = getRandomBoolean();
    const rating = getRandomNumber(RATING_MIN, RATING_MAX, RATING_PRECISION);
    const housingType = getRandomItem(serverMock.housingType);
    const roomCount = getRandomNumber(ROOM_COUNT_MIN, ROOM_COUNT_MAX);
    const tenantCount = getRandomNumber(TENANT_COUNT_MIN, TENANT_COUNT_MAX);
    const price = getRandomNumber(PRICE_MIN, PRICE_MAX);
    const features = getRandomChunk(serverMock.feature).join(';');
    const user = getRandomItem(serverMock.users).join(';');
    const location = getRandomItem(serverMock.location).map(String).join(';');

    return [
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
      user,
      location
    ].join('\t').concat('\n');
  }
}
