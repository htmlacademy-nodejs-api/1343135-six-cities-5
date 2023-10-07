import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserService } from './user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';
import { Component } from '../../types/component.enum.js';
import { UserEntity, UserModel } from './user.entity.js';

export function createUserContainer() {
  const container = new Container();
  container.bind<UserService>(Component.UserService).to(DefaultUserService);
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return container;
}
