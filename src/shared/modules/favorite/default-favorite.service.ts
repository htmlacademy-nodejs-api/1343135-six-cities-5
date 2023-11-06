import { types } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import { Pagination } from '../../types/pagination.js';
import { CreateFavoriteDto, DeleteFavoriteDto, FavoriteEntity, FavoriteService } from './index.js';
import { DefaultPaginationParams } from './consts.js';
import { Component } from '../../types/component.enum.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { IsFavoriteMap } from './favorite.types.js';
import { getPaginationParams } from '../../utils/common.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async findByUserId(userId: string, pagination?: Pagination) {
    const { offset, limit } = getPaginationParams(pagination, DefaultPaginationParams);

    return this.favoriteModel
      .aggregate<OfferEntity>([
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
      .skip(offset)
      .limit(limit);
  }

  public async create({ userId, offerId }: CreateFavoriteDto) {
    let favorite = await this.favoriteModel.findOne({ user: userId, offer: offerId });

    if (!favorite) {
      favorite = await this.favoriteModel.create({ user: userId, offer: offerId });
    }

    return favorite.toObject();
  }

  public async delete({ userId, offerId }: DeleteFavoriteDto) {
    await this.favoriteModel.findOneAndRemove({ user: userId, offer: offerId });
  }

  public async getIsFavoriteMap(offerIds: string[], userId?: string) {
    if (!userId) {
      return {};
    }

    const favoriteForUser = await this.findByUserId(userId);
    const favoriteForUserSet = new Set(
      favoriteForUser.map((offer) => offer._id.toString())
    );

    const result: IsFavoriteMap = {};

    for (const offerId of offerIds) {
      result[offerId] = favoriteForUserSet.has(offerId);
    }

    return result;
  }

  public async exists({ offerId, userId}: { offerId: string, userId: string }) {
    const existing = await this.favoriteModel.findOne({ offer: offerId, user: userId });
    return Boolean(existing);
  }
}
