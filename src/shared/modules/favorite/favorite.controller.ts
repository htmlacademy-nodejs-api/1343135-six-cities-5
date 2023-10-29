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
import { OfferShortRdo } from '../offer/index.js';
import { CreateFavoriteRdo } from './rdo/CreateFavoriteRdo.js';
import { ValidateObjectIdMiddleware } from '../../lib/rest/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../lib/rest/middleware/validate-dto.middleware.js';
import { CreateFavoriteDto, DeleteFavoriteDto } from './index.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService) protected readonly favoriteService: FavoriteService

  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/:userId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
      ] });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateFavoriteDto)
      ],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateDtoMiddleware(DeleteFavoriteDto)
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
    await this.favoriteService.delete(req.body);
    this.noContent(res);
  }
}
