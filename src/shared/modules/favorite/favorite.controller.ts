import { injectable, inject } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../lib/rest/controller/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/index.js';
import { HttpMethod } from '../../lib/rest/types/http-method.enum.js';
import { Pagination } from '../../types/pagination.js';
import { fillDto, fillParams } from '../../utils/common.js';
import { FavoriteService } from './favorite-service.interface.js';
import { CreateFavoriteRequest, DeleteFavoriteRequest, IndexFavoriteRequest } from './types.js';
import { OfferShortRdo } from '../offer/index.js';
import { HttpError } from '../../lib/rest/errors/http-error.js';
import { CreateFavoriteRdo } from './rdo/CreateFavoriteRdo.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService) protected readonly favoriteService: FavoriteService

  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId/:userId', method: HttpMethod.Delete, handler: this.delete });
  }

  private async index(req: IndexFavoriteRequest, res: Response) {
    const { limit, offset, userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Not authorized');
    }

    const pagination = fillParams(Pagination, { limit, offset });
    const favoriteList = await this.favoriteService.findByUserId(userId, pagination);

    this.ok(res, fillDto(OfferShortRdo, favoriteList));
  }

  private async create(req: CreateFavoriteRequest, res: Response) {
    const favorite = await this.favoriteService.create(req.body);

    this.ok(res, fillDto(CreateFavoriteRdo, favorite));
  }

  private async delete(req: DeleteFavoriteRequest, res: Response) {
    const { offerId, userId } = req.params;

    if (!offerId || !userId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Invalid params');
    }

    await this.favoriteService.delete({ offerId, userId });
    this.noContent(res);
  }
}
