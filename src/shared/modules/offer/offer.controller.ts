import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../lib/rest/controller/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/index.js';
import { HttpMethod } from '../../lib/rest/types/http-method.enum.js';
import { OfferService } from './offer-service.interface.js';
import { Pagination } from '../../types/pagination.js';
import { fillDto, fillParams } from '../../utils/common.js';
import { OfferShortRdo } from './rdo/offer-short.rdo.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { HttpError } from '../../lib/rest/errors/index.js';
import { CreateOfferRequest, DeleteOfferRequest, PremiumForCityRequest, ShowOfferRequest, UpdateOfferRequest } from './offer.types.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ValidateDtoMiddleware } from '../../lib/rest/middleware/validate-dto.middleware.js';
import { CreateOfferDto, OfferEntity } from './index.js';
import { ValidateObjectIdMiddleware } from '../../lib/rest/middleware/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../lib/rest/middleware/document-exists.middleware.js';
import { PremiumDto } from './dto/premium.dto.js';
import { UserEntity, UserService } from '../user/index.js';
import { PrivateRouteMiddleware } from '../../lib/rest/middleware/private-route.middleware.js';
import { FavoriteService } from '../favorite/index.js';
import { DocumentType } from '@typegoose/typegoose';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto, (req) => req.body),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req: CreateOfferRequest) => req.tokenPayload!.id,
        ),
      ]
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware((req: ShowOfferRequest) => req.params.id),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: ShowOfferRequest) => req.params.id),
      ]
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware((req: UpdateOfferRequest) => req.params.id),
        new ValidateDtoMiddleware(UpdateOfferDto, (req) => req.body),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: UpdateOfferRequest) => req.params.id),
      ]
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware((req: DeleteOfferRequest) => req.params.id),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: DeleteOfferRequest) => req.params.id),
      ]
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.premiumForCity,
      middlewares: [
        new ValidateDtoMiddleware(PremiumDto, (req) => req.params),
      ],
    });
  }

  private async index(req: Request, res: Response) {
    const offers = await this.offerService.find(
      fillParams(Pagination, req.query)
    );
    const result = await this.populateIsFavorite(offers, req.tokenPayload?.id);

    this.ok(res, fillDto(OfferShortRdo, result));
  }

  private async create(req: CreateOfferRequest, res: Response) {
    const offer = await this.offerService.create({
      ...req.body,
      authorId: req.tokenPayload!.id
    });

    return this.created(res, fillDto(OfferRdo, offer));
  }

  private async show(req: ShowOfferRequest, res: Response) {
    const userId = req.tokenPayload?.id;
    const offer = await this.offerService.findById(req.params.id);
    const isFavorite = userId
      ? await this.favoriteService.exists({ userId, offerId: req.params.id })
      : false;

    return this.ok(res, fillDto(OfferRdo, { ...offer?.toObject(), isFavorite }));
  }

  private async update(req: UpdateOfferRequest, res: Response) {
    await this.checkAuthor(req);
    const updatedOffer = await this.offerService.update(
      req.params.id,
      fillParams(UpdateOfferDto, req.body)
    );

    this.ok(res, fillDto(OfferRdo, updatedOffer));
  }

  private async delete(req: DeleteOfferRequest, res: Response) {
    await this.checkAuthor(req);
    await this.offerService.delete(req.params.id);

    this.noContent(res);
  }

  private async premiumForCity(req: PremiumForCityRequest, res: Response) {
    if (!req.params.city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request',
        'City should be specified',
      );
    }

    const offers = await this.offerService.findPremiumForCity(
      req.params.city,
      fillParams(Pagination, req.query)
    );
    const result = await this.populateIsFavorite(offers, req.tokenPayload?.id);

    this.ok(res, fillDto(OfferShortRdo, result));
  }

  private async checkAuthor(req: UpdateOfferRequest | DeleteOfferRequest) {
    if(
      !req.tokenPayload?.id ||
      !await this.offerService.isAuthor(req.params.id, req.tokenPayload.id)
    ) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'Forbidden to update/delete if user is not an author',
      );
    }
  }

  private async populateIsFavorite(offers: DocumentType<OfferEntity>[], userId?: UserEntity['id']) {
    const favoriteOfferIds = await this.favoriteService.getFavoriteOfferIds(
      offers.map((offer) => offer.id),
      userId,
    );
    const favoriteOfferIdsSet = new Set(favoriteOfferIds);

    return offers.map((offer) => ({
      ...offer.toObject(),
      isFavorite: favoriteOfferIdsSet.has(offer.id),
    }));
  }
}
