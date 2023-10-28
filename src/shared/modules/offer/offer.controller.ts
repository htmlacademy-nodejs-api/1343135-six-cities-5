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
import { CreateOfferRequest, DeleteOfferRequest, PremiumForCityRequest, ShowOfferRequest, UpdateOfferRequest } from './types.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) protected readonly offerService: OfferService

  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/:id', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.premiumForCity });
  }

  private async index(req: Request, res: Response) {
    const offers = await this.offerService.find(
      fillParams(Pagination, req.query)
    );

    this.ok(res, fillDto(OfferShortRdo, offers));
  }

  private async create(req: CreateOfferRequest, res: Response) {
    const offer = await this.offerService.create(req.body);

    return this.created(res, fillDto(OfferRdo, offer));
  }

  private async show(req: ShowOfferRequest, res: Response) {
    const offer = await this.offerService.findById(req.params.id);

    if (offer) {
      return this.ok(res, fillDto(OfferRdo, offer));
    }

    throw new HttpError(StatusCodes.NOT_FOUND, 'Not found');
  }

  private async update(req: UpdateOfferRequest, res: Response) {
    const offerExists = await this.offerService.exists(req.params.id);

    if (!offerExists) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Not found');
    }

    const updatedOffer = await this.offerService.update(
      req.params.id,
      fillParams(UpdateOfferDto, req.body)
    );

    this.ok(res, fillDto(OfferRdo, updatedOffer));
  }

  private async delete(req: DeleteOfferRequest, res: Response) {
    const offerExists = await this.offerService.exists(req.params.id);

    if (!offerExists) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Not found');
    }

    await this.offerService.delete(req.params.id);

    this.noContent(res);
  }

  private async premiumForCity(req: PremiumForCityRequest, res: Response) {
    if (!req.params.city) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Bad request',
        'City should be specified',
      );
    }

    const offers = await this.offerService.findPremiumForCity(
      req.params.city,
      fillParams(Pagination, req.query)
    );

    this.ok(res, fillDto(OfferShortRdo, offers));
  }
}
