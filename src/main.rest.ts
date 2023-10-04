import { Container } from 'inversify';
import 'reflect-metadata';
import { Component } from './shared/types/component.enum.js';
import { RestApplication } from './rest/rest.application.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createRestAplicationContainer } from './rest/rest.container.js';
import { OfferService } from './shared/modules/offer/offer-service.interface.js';
import { Logger } from './shared/lib/logger/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestAplicationContainer(),
    createOfferContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();

  const offer = await appContainer.get<OfferService>(Component.OfferService).create({
    title: 'Title 10 symbols',
    description: 'THis is my oong long long descisa',
    datePublished: new Date(),
    city: 'Amsterdam',
    preview: 'preview/url',
    photos: [
      'photo/url',
      'photo/url',
      'photo/url',
      'photo/url',
      'photo/url',
      'photo/url',
    ],
    isPremium: true,
    rating: 2,
    housingType: 'hotel',
    roomCount: 3,
    tenantCount: 2,
    price: 200,
    features: ['Breakfast', 'Fridge'],
    authorId: 'uuid-author',
    location: [2, 3]
  });

  appContainer.get<Logger>(Component.Logger).info(`offer created: ${JSON.stringify(offer)}`);
}

bootstrap();
