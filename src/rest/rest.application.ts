import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { RestConfigSchema, Config } from '../shared/lib/config/index.js';
import { Logger } from '../shared/lib/logger/logger.interface.js';
import { Component } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/lib/database-client/index.js';
import { getMongoUrl } from '../shared/utils/database.js';
import { ExceptionFilter } from '../shared/lib/rest/exception-filter/exception-filter.interface.js';
import { Controller } from '../shared/lib/rest/controller/index.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestConfigSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.UserController) private readonly userController: Controller
  ) {
    this.server = express();
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

  private initMiddleware() {
    this.server.use(express.json());
  }

  private initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
  }

  private initExceptionFilter() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  private async initServer() {
    return new Promise<void>((resolve) => {
      this.server.listen(this.config.get('PORT'), resolve);
    });
  }

  public async init() {
    this.logger.info('Init database');
    await this.initDb();
    this.logger.info('Database initialized');

    this.logger.info('Init app level middlewares');
    this.initMiddleware();
    this.logger.info('App level middlewares initialized');

    this.logger.info('Init controllers');
    this.initControllers();
    this.logger.info('Controllers initialized');

    this.logger.info('Init app exception filter');
    this.initExceptionFilter();
    this.logger.info('App exception filter initialized');

    this.logger.info('Init server');
    await this.initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);

    this.logger.info('RestApplication started');
  }
}
