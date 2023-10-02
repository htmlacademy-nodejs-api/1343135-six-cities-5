import { Container } from 'inversify';
import 'reflect-metadata';
import { Component } from './shared/types/component.enum.js';
import { RestApplication } from './rest/rest.application.js';
import { Logger, PinoLogger } from './shared/lib/logger/index.js';
import { Config, RestConfig, RestConfigSchema } from './shared/lib/config/index.js';

function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestConfigSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  application.init();
}

bootstrap();
