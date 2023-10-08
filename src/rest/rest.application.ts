import { inject, injectable } from 'inversify';
import { RestConfigSchema, Config } from '../shared/lib/config/index.js';
import { Logger } from '../shared/lib/logger/logger.interface.js';
import { Component } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/lib/database-client/index.js';
import { getMongoUrl } from '../shared/utils/database.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestConfigSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient
  ) {}

  public async init() {
    this.logger.info(`PORT=${this.config.get('PORT')}`);
    await this.databaseClient.connect(getMongoUrl({
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASSWORD'),
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      databaseName: this.config.get('DB_NAME'),
    }));
    this.logger.info('RestApplication started');
  }
}
