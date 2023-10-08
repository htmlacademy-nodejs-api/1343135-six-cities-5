import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto) {
    const offer = await this.offerModel.create(dto);
    this.logger.info(`New offer created: "${offer.title}"`);

    return offer;
  }

  public async findById(id: string) {
    try {
      return await this.offerModel.findById(id);
    } catch {
      return null;
    }
  }
}
