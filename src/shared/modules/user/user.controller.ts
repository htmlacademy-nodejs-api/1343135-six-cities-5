import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
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
import { FileUploadMiddleware } from '../../lib/rest/middleware/file-upload.middleware.js';
import { DocumentExistsMiddleware, PrivateRouteMiddleware } from '../../lib/rest/middleware/index.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { AVATAR_FORMATS } from './consts.js';
import { AuthService } from '../auth/index.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { ComposedValidator, FileExtensionValidator, FileMimeValidator } from '../../utils/validation.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestConfigSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController');

    this.addRoute({
      path: '/signup',
      method: HttpMethod.Post,
      handler: this.signup ,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto, (req) => req.body),
      ],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(
          LoginUserDto,
          (req) => req.body,
          'Invalid email or password',
        ),
      ],
    });
    this.addRoute({
      path: '/status',
      method: HttpMethod.Get,
      handler: this.status,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req) => req.tokenPayload.id),
      ],
    });
    this.addRoute({
      path: '/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req) => req.tokenPayload.id),
        new ValidateDtoMiddleware(UpdateUserDto, (req) => req.body),
        new FileUploadMiddleware(
          this.config.get('UPLOAD_DIR'),
          'fileName',
          new ComposedValidator([
            new FileMimeValidator(AVATAR_FORMATS.mimeTypes),
            new FileExtensionValidator(AVATAR_FORMATS.ext),
          ]),
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
    const token = await this.authService.authenticate(req.body);
    const data = fillDto(LoggedUserRdo, { token, email: req.body.email });
    this.ok(res, data);
  }

  private async status(req: Request, res: Response) {
    const user = await this.userService.findById(req.tokenPayload.id);
    this.ok(res, fillDto(UserRdo, user));
  }

  private async uploadAvatar(req: Request, res: Response) {
    this.userService.update(req.tokenPayload.id, { avatar: req.file?.path });
    this.created(res, { file: req.file?.path });
  }
}
