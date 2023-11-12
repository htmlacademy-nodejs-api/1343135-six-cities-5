import { injectable, inject } from 'inversify';
import { Response } from 'express';
import { BaseController } from '../../lib/rest/controller/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/index.js';
import { HttpMethod } from '../../lib/rest/types/http-method.enum.js';
import { Pagination } from '../../types/pagination.js';
import { fillDto, fillParams } from '../../utils/common.js';
import { FavoriteService } from './favorite-service.interface.js';
import { CreateFavoriteRequest, DeleteFavoriteRequest, IndexFavoriteRequest } from './favorite.types.js';
import { OfferService, OfferShortRdo } from '../offer/index.js';
import { CreateFavoriteRdo } from './rdo/create-favorite.rdo.js';
import { ValidateObjectIdMiddleware } from '../../lib/rest/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../lib/rest/middleware/validate-dto.middleware.js';
import { CreateFavoriteDto } from './index.js';
import { DocumentExistsMiddleware } from '../../lib/rest/middleware/document-exists.middleware.js';
import { UserService } from '../user/index.js';
import { PrivateRouteMiddleware } from '../../lib/rest/middleware/private-route.middleware.js';

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
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware((req) => req.tokenPayload!.id),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req: IndexFavoriteRequest) => req.tokenPayload!.id,
        )
      ] });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware((req) => req.tokenPayload!.id),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req) => req.tokenPayload!.id,
        ),
        new ValidateDtoMiddleware(CreateFavoriteDto, (req) => req.body),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: CreateFavoriteRequest) => req.body.offerId,
        ),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware((req: DeleteFavoriteRequest) => req.tokenPayload!.id),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req) => req.tokenPayload!.id,
        ),
        new ValidateObjectIdMiddleware((req: DeleteFavoriteRequest) => req.params.offerId),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: DeleteFavoriteRequest) => req.params.offerId,
        ),
      ]
    });
  }

  private async index(req: IndexFavoriteRequest, res: Response) {
    const favoriteList = await this.favoriteService.findByUserId(
      req.tokenPayload!.id,
      fillParams(Pagination, req.query)
    );
    const result = favoriteList.map((offer) => ({ ...offer, isFavorite: true }));

    this.ok(res, fillDto(OfferShortRdo, result));
  }

  private async create(req: CreateFavoriteRequest, res: Response) {
    const favorite = await this.favoriteService.create({
      offerId: req.body.offerId,
      userId: req.tokenPayload!.id,
    });

    this.created(res, fillDto(CreateFavoriteRdo, favorite));
  }

  private async delete(req: DeleteFavoriteRequest, res: Response) {
    await this.favoriteService.delete({
      offerId: req.params.offerId,
      userId: req.tokenPayload!.id,
    });
    this.noContent(res);
  }
}
