import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/component.enum.js';
import { RestApplication } from './rest/rest.application.js';
import { createRestAplicationContainer } from './rest/rest.container.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createUserContainer } from './shared/modules/user/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestAplicationContainer(),
    createOfferContainer(),
    createUserContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
