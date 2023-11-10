import { injectable, inject } from 'inversify';
import { SignJWT } from 'jose';
import crypto from 'node:crypto';
import { LoginUserDto } from '../user/dto/login-user.dto.js';
import { UserEntity } from '../user/user.entity.js';
import { AuthService } from './auth-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { Config, RestConfigSchema } from '../../lib/config/index.js';
import { TokenPayload } from './auth.types.js';
import { JWT } from './auth.consts.js';
import { UserService } from '../user/index.js';
import { AuthException } from './errors/auth.exception.js';
import { Logger } from '../../lib/logger/index.js';
import { fillDto } from '../../utils/common.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Config) private readonly config: Config<RestConfigSchema>,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  private async createToken(user: UserEntity) {
    const secret = crypto.createSecretKey(this.config.get('JWT_SECRET'), 'utf-8');
    const payload = fillDto(TokenPayload, user);
    const token = new SignJWT({ ...payload })
      .setProtectedHeader({ alg: JWT.algorithm })
      .setIssuedAt()
      .setExpirationTime(JWT.expires)
      .sign(secret);

    return token;
  }

  public async authenticate(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      this.logger.warn(`User with email ${dto.email} not found`);
      throw new AuthException();
    }

    if (!user.checkPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for user: ${user.id}, email: ${user.email}`);
      throw new AuthException();
    }

    return this.createToken(user);
  }
}
