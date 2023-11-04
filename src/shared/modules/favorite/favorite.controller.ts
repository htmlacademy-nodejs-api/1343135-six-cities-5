import { injectable, inject } from 'inversify';
import { Response } from 'express';
import { BaseController } from '../../lib/rest/controller/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/index.js';
import { HttpMethod } from '../../lib/rest/types/http-method.enum.js';
import { Pagination } from '../../types/pagination.js';
import { fillDto, fillParams } from '../../utils/common.js';
import { FavoriteService } from './favorite-service.interface.js';
import { CreateFavoriteRequest, DeleteFavoriteRequest, IndexFavoriteRequest } from './types.js';
import { OfferService, OfferShortRdo } from '../offer/index.js';
import { CreateFavoriteRdo } from './rdo/CreateFavoriteRdo.js';
import { ValidateObjectIdMiddleware } from '../../lib/rest/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../lib/rest/middleware/validate-dto.middleware.js';
import { CreateFavoriteDto } from './index.js';
import { DocumentExistsMiddleware } from '../../lib/rest/middleware/document-exists.middleware.js';
import { UserService } from '../user/index.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/:userId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware((req) => req.params.userId),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req: IndexFavoriteRequest) => req.params.userId,
        )
      ] });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateFavoriteDto, (req) => req.body),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: CreateFavoriteRequest) => req.body.offerId,
        ),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req: CreateFavoriteRequest) => req.body.userId,
        ),
      ],
    });
    this.addRoute({
      path: '/:offerId/:userId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware((req: DeleteFavoriteRequest) => req.params.offerId),
        new ValidateObjectIdMiddleware((req: DeleteFavoriteRequest) => req.params.userId),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: DeleteFavoriteRequest) => req.params.offerId
        ),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req: DeleteFavoriteRequest) => req.params.userId
        ),
      ]
    });
  }

  private async index(req: IndexFavoriteRequest, res: Response) {
    const favoriteList = await this.favoriteService.findByUserId(
      req.params.userId,
      fillParams(Pagination, req.query)
    );

    this.ok(res, fillDto(OfferShortRdo, favoriteList));
  }

  private async create(req: CreateFavoriteRequest, res: Response) {
    const favorite = await this.favoriteService.create(req.body);

    this.created(res, fillDto(CreateFavoriteRdo, favorite));
  }

  private async delete(req: DeleteFavoriteRequest, res: Response) {
    const { offerId, userId } = req.params;
    await this.favoriteService.delete({ offerId, userId });
    this.noContent(res);
  }
}
