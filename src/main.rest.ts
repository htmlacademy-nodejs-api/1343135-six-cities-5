import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/component.enum.js';
import { RestApplication } from './rest/rest.application.js';
import { createRestAplicationContainer } from './rest/rest.container.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { createFavoriteContainer } from './shared/modules/favorite/index.js';
import { createAuthContainer } from './shared/modules/auth/auth.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestAplicationContainer(),
    createOfferContainer(),
    createUserContainer(),
    createCommentContainer(),
    createFavoriteContainer(),
    createAuthContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
