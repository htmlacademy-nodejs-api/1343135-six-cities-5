import { Config } from './config.interface.js';
import { RestConfigSchema, restConfigSchema } from './rest.config-schema.js';
import { config } from 'dotenv';
import { Logger } from '../logger/logger.interface.js';

export class RestConfig implements Config<RestConfigSchema> {
  private readonly config: RestConfigSchema;

  constructor(
    private readonly logger: Logger
  ) {
    const parseOutput = config();

    if (parseOutput.error) {
      throw new Error('Can\'t read .env file. Please check if file exists.');
    }

    try {
      this.config = restConfigSchema
        .load(parseOutput.parsed)
        .validate({ allowed: 'strict', output: this.logger.info })
        .getProperties();
    } catch (error) {
      this.logger.error(
        'Invalid .env file',
        error instanceof Error ? error : new Error('.env file validation failed'),
      );
      throw error;
    }

    this.logger.info('.env file is parsed');
  }

  public get<T extends keyof RestConfigSchema>(key: T) {
    return this.config[key];
  }
}
