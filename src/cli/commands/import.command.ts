import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { Offer } from '../../shared/types/offer.type.js';
import { City } from '../../shared/types/city.type-enum.js';
import { HousingType } from '../../shared/types/housingType.type-enum.js';
import { Feature } from '../../shared/types/feature.type-enum.js';
import { booleanFromString } from '../../shared/utils/booleanFromString.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(filepath?: string) {
    try {
      if (!filepath) {
        throw new Error('Path to *.tsv file should be provided');
      }

      const tsvFile = readFileSync(filepath, { encoding: 'utf-8' });
      const offers = tsvFile
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          const [title, description, datePublished, city, preview, photos, isPremium, isFavorite, rating, housingType, roomCount, tenantCount, price, features, authorId, location] = line.split('\t');

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
            location: location.split(';').map((item) => Number(item)) as Offer['location'],
          };

          return offer;
        });

      console.log(offers);
    } catch (error) {
      console.error(chalk.red('File import failed'));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }

}
