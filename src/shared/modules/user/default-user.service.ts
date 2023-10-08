import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(dto: CreateUserDto, salt: string) {
    const userEntity = new UserEntity(dto);
    userEntity.setPassword(dto.password, salt);
    const user = await this.userModel.create(userEntity);

    this.logger.info(`New user created: "${user.name}"`);

    return user;
  }

  public async findById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch {
      return null;
    }
  }

  public async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  public async findOrCreate(dto: CreateUserDto, salt: string) {
    const existing = await this.findByEmail(dto.email);

    if (existing) {
      return existing;
    }

    return this.create(dto, salt);
  }
}
