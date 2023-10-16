import { Command } from './command.interface.js';
import chalk from 'chalk';
import { getErrorMessage } from '../../shared/utils/get-error-message.js';
import { TSVOfferParser } from '../../shared/lib/tsv-offer-parser/index.js';
import { TSVFileReader } from '../../shared/lib/tsv-file-reader/index.js';
import { UserService, CreateUserDto } from '../../shared/modules/user/index.js';
import { CreateOfferDto, OfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient } from '../../shared/lib/database-client/index.js';
import { Logger } from '../../shared/lib/logger/index.js';
import { Config, RestConfigSchema } from '../../shared/lib/config/index.js';
import { getMongoUrl } from '../../shared/utils/database.js';

export class ImportCommand implements Command {
  constructor(
    private readonly logger: Logger,
    private readonly config: Config<RestConfigSchema>,
    private readonly databaseClient: DatabaseClient,
    private readonly userService: UserService,
    private readonly offerService: OfferService,
  ) {}

  private async connectToDatabase(databaseUri?: string) {
    try {
      const uri = databaseUri || getMongoUrl({
        username: this.config.get('DB_USERNAME'),
        password: this.config.get('DB_PASSWORD'),
        host: this.config.get('DB_HOST'),
        port: this.config.get('DB_PORT'),
        databaseName: this.config.get('DB_NAME'),
      });

      await this.databaseClient.connect(uri);
    } catch (error) {
      const errorToThrow = error instanceof Error ? error : new Error('Database connection error');
      this.logger.error(`Database connection error. URI: ${databaseUri}`, errorToThrow);
      throw errorToThrow;
    }
  }

  private async findOrCreateUser(dto: CreateUserDto) {
    try {
      return await this.userService.findOrCreate(dto, this.config.get('SALT'));
    } catch (error) {
      const errorToThrow = error instanceof Error ? error : new Error('User creation error');
      this.logger.error(`User creation error. DTO: ${JSON.stringify(dto)}`, errorToThrow);
      throw errorToThrow;
    }
  }

  private async createOffer(dto: CreateOfferDto) {
    try {
      return await this.offerService.create(dto);
    } catch (error) {
      const errorToThrow = error instanceof Error ? error : new Error('Offer creation error');
      this.logger.error(`Offer creation error. DTO: ${JSON.stringify(dto)}`, errorToThrow);
      throw errorToThrow;
    }
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filepath?: string, databaseUri?: string) {
    try {
      if (!filepath) {
        throw new Error('Path to *.tsv file should be provided');
      }

      await this.connectToDatabase(databaseUri);

      const fileReader = new TSVFileReader(filepath);

      fileReader.on('line', async (line: string, resolve: () => void) => {
        const offer = TSVOfferParser.parse(line);
        const user = await this.findOrCreateUser(offer.user);
        await this.createOffer({ ...offer, authorId: user.id });
        resolve();
      });

      fileReader.on(
        'end',
        (lineCount: number) => console.log(`Import is finished. Created ${lineCount} offers`)
      );

      await fileReader.read();
    } catch (error) {
      this.logger.error(chalk.red(`File import failed. ${getErrorMessage(error)}`), error instanceof Error ? error : new Error());
    } finally {
      await this.databaseClient.disconnect();
    }
  }
}
