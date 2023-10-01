import { config } from 'dotenv';
import { injectable, inject } from 'inversify';
import { Config } from './config.interface.js';
import { RestConfigSchema, restConfigSchema } from './rest.config-schema.js';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestConfigSchema> {
  private readonly config: RestConfigSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
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
