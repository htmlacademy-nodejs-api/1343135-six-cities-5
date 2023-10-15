import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CityValue } from '../../types/city.enum.js';
import { Pagination } from '../../types/pagination.js';
import { DEFAULT_LIMIT, DEFAULT_LIMIT_PREMIUM, DEFAULT_OFFSET } from './consts.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto) {
    const offer = (await this.offerModel.create(dto)).populate('author');

    return offer;
  }

  public async findById(id: string) {
    try {
      return await this.offerModel.findById(id).populate('author');
    } catch {
      return null;
    }
  }

  public async update(id: OfferEntity['id'], dto: UpdateOfferDto) {
    const offer = await this.findById(id);

    if (!offer) {
      this.logger.info(`Not found offer to update. ID: ${id}`);
      throw new Error('Not found offer to update');
    }

    await offer.updateOne(dto).populate('author');

    return offer;
  }

  public async delete(id: OfferEntity['id']) {
    this.offerModel.findByIdAndRemove(id);
  }

  public find(pagination?: Pagination) {
    const calculatedOffset = pagination?.offset ?? DEFAULT_OFFSET;
    const calculatedLimit = pagination?.limit ?? DEFAULT_LIMIT;

    return this.offerModel
      .find()
      .sort({ createdAt: -1 })
      .skip(calculatedOffset)
      .limit(calculatedLimit);
  }

  public async findPremiumByCity(city: CityValue, pagination?: Pagination) {
    const calculatedOffset = pagination?.offset ?? DEFAULT_OFFSET;
    const calculatedLimit = pagination?.limit !== undefined ? Math.min(pagination.limit, DEFAULT_LIMIT_PREMIUM) : DEFAULT_LIMIT_PREMIUM;

    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ createdAt: -1 })
      .offset(calculatedOffset)
      .limit(calculatedLimit);
  }

  public async incrementCommentCount(id: OfferEntity['id']) {
    return this.offerModel
      .findByIdAndUpdate(id, { $inc: { commentCount: 1 } });
  }
}
