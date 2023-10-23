import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { FavoriteService } from './favorite-service.interface.js';
import { DefaultFavoriteService } from './default-favorite.service.js';
import { Component } from '../../types/component.enum.js';
import { FavoriteEntity, FavoriteModel } from './favorite.entity.js';
import { FavoriteController } from './favorite.controller.js';
import { Controller } from '../../lib/rest/controller/index.js';

export function createFavoriteContainer() {
  const container = new Container();
  container.bind<FavoriteService>(Component.FavoriteService).to(DefaultFavoriteService);
  container.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel).toConstantValue(FavoriteModel);
  container.bind<Controller>(Component.FavoriteController).to(FavoriteController).inSingletonScope();

  return container;
}
