import { injectable, inject } from 'inversify';
import { Response } from 'express';

import { BaseController } from '../../lib/rest/controller/base-controller.abstract.js';
import { Logger } from '../../lib/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { LoginUserRequest, SignupUserRequest } from './types.js';
import { UserService } from './index.js';
import { Config, RestConfigSchema } from '../../lib/config/index.js';
import { fillDto } from '../../utils/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { HttpMethod } from '../../lib/rest/types/http-method.enum.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestConfigSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for UserController');

    this.addRoute({ path: '/signup', method: HttpMethod.Post, handler: this.signup });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
  }

  private async signup(req: SignupUserRequest, res: Response) {
    const user = await this.userService.findOrCreate(req.body, this.config.get('SALT'));

    this.created(res, fillDto(UserRdo, user));
  }

  private async login(req: LoginUserRequest, res: Response) {
    const isLoggedIn = await this.userService.login(req.body, this.config.get('SALT'));

    if (isLoggedIn) {
      return this.noContent(res);
    }

    return this.send(res, 400, undefined);
  }
}
