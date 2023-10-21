import { Container } from 'inversify';
import { Component } from '../shared/types/component.enum.js';
import { RestApplication } from './rest.application.js';
import { Logger, PinoLogger } from '../shared/lib/logger/index.js';
import { Config, RestConfig, RestConfigSchema } from '../shared/lib/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/lib/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter } from '../shared/lib/rest/exception-filter/index.js';

export function createRestAplicationContainer() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestConfigSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return container;
}
