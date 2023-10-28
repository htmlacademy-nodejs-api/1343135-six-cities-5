import { types } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import { Pagination } from '../../types/pagination.js';
import { CreateFavoriteDto, DeleteFavoriteDto, FavoriteEntity, FavoriteService } from './index.js';
import { DefaultPaginationParams } from './consts.js';
import { Component } from '../../types/component.enum.js';
import { OfferEntity } from '../offer/offer.entity.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async findByUserId(userId: string, pagination?: Pagination | undefined) {
    const calculatedOffset = pagination?.offset ?? DefaultPaginationParams.offset;
    const calculatedLimit = pagination?.limit ?? DefaultPaginationParams.limit;

    const result = await this.favoriteModel
      .aggregate<types.DocumentType<OfferEntity>>([
        { $match: { user: new mongoose.Types.ObjectId(userId) }},
        {
          $lookup: {
            from: 'offers',
            localField: 'offer',
            foreignField: '_id',
            as: 'offers',
          }
        },
        { $unwind: '$offers' },
        { $replaceWith: '$offers' },
      ])
      .sort({ createdAt: -1 })
      .skip(calculatedOffset)
      .limit(calculatedLimit);

    return result;
  }

  public async create({ userId, offerId }: CreateFavoriteDto) {
    let favorite = await this.favoriteModel.findOne({ user: userId, offer: offerId });

    if (!favorite) {
      favorite = await this.favoriteModel.create({ user: userId, offer: offerId });
    }

    return favorite;
  }

  public async delete({ userId, offerId }: DeleteFavoriteDto) {
    await this.favoriteModel.findOneAndRemove({ user: userId, offer: offerId });
  }
}
