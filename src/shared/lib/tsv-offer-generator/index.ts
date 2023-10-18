import { MockServerData } from '../../types/mock-server-data.type.js';
import { getRandomBoolean, getRandomNumber, getRandomItem, getRandomChunk } from '../../utils/random.js';

const PHOTO_COUNT = 6;

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
    const city = getRandomItem(serverMock.city);
    const preview = getRandomItem(serverMock.preview);
    const photos = getRandomChunk(serverMock.photos, PHOTO_COUNT).join(';');
    const isPremium = getRandomBoolean();
    const housingType = getRandomItem(serverMock.housingType);
    const roomCount = getRandomNumber(ROOM_COUNT_MIN, ROOM_COUNT_MAX);
    const tenantCount = getRandomNumber(TENANT_COUNT_MIN, TENANT_COUNT_MAX);
    const price = getRandomNumber(PRICE_MIN, PRICE_MAX);
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
