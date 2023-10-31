import { injectable, inject } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController } from '../../lib/rest/controller/base-controller.abstract.js';
import { Logger } from '../../lib/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { LoginUserRequest, SignupUserRequest } from './types.js';
import { CreateUserDto, UserService } from './index.js';
import { Config, RestConfigSchema } from '../../lib/config/index.js';
import { fillDto } from '../../utils/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { HttpMethod } from '../../lib/rest/types/http-method.enum.js';
import { ValidateDtoMiddleware } from '../../lib/rest/middleware/validate-dto.middleware.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { HttpError } from '../../lib/rest/errors/index.js';
import { RequestField } from '../../lib/rest/types/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestConfigSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for UserController');

    this.addRoute({
      path: '/signup',
      method: HttpMethod.Post,
      handler: this.signup ,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto),
      ],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(
          LoginUserDto,
          RequestField.Body,
          'Invalid email or password',
        ),
      ],
    });
  }

  private async signup(req: SignupUserRequest, res: Response) {
    const existing = await this.userService.findByEmail(req.body.email);

    if (existing) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${req.body.email}" already registered`,
        'Signup User'
      );
    }

    const user = await this.userService.create(req.body, this.config.get('SALT'));

    this.created(res, fillDto(UserRdo, user));
  }

  private async login(req: LoginUserRequest, res: Response) {
    const isLoggedIn = await this.userService.login(req.body, this.config.get('SALT'));

    if (isLoggedIn) {
      return this.noContent(res);
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      'Invalid email or password',
    );
  }
}
