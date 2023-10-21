import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { RestConfigSchema, Config } from '../shared/lib/config/index.js';
import { Logger } from '../shared/lib/logger/logger.interface.js';
import { Component } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/lib/database-client/index.js';
import { getMongoUrl } from '../shared/utils/database.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestConfigSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient
  ) {
    this.server = express();
  }

  private async initServer() {
    return new Promise<void>((resolve) => {
      this.server.listen(this.config.get('PORT'), resolve);
    });
  }

  private async initDb() {
    await this.databaseClient.connect(getMongoUrl({
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASSWORD'),
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      databaseName: this.config.get('DB_NAME'),
    }));
  }

  public async init() {
    this.logger.info('Init database');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init server');
    await this.initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);

    this.logger.info('RestApplication started');
  }
}
