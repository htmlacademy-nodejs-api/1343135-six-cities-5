import { types } from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import { Pagination } from '../../types/pagination.js';
import { CreateFavoriteDto, DeleteFavoriteDto, FavoriteEntity, FavoriteService } from './index.js';
import { DefaultPaginationParams } from './consts.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async findByUserId(userId: string, pagination?: Pagination | undefined): Promise<types.DocumentType<FavoriteEntity>[]> {
    const calculatedOffset = pagination?.offset ?? DefaultPaginationParams.offset;
    const calculatedLimit = pagination?.limit ?? DefaultPaginationParams.limit;

    const result = await this.favoriteModel
      .aggregate([
        { $match: { $expr: { user: userId } } },
        {
          $lookup: {
            from: 'offers',
            foreignField: '_id',
            localField: 'offer',
            as: 'offers',
          }
        },
        { $unwind: '$offers' },
        { $replaceWith: '$offers' },
        { $sort: { createdAt: -1 } },
        { $skip: calculatedOffset },
        { $limit: calculatedLimit },
      ]);

    return result;
  }

  public async create({ userId, offerId }: CreateFavoriteDto) {
    const existing = await this.favoriteModel.findOne({ user: userId, offer: offerId });

    if (existing) {
      return existing;
    }

    return this.favoriteModel.create({ user: userId, offer: offerId });
  }

  public async delete({ userId, offerId}: DeleteFavoriteDto) {
    this.favoriteModel.findOneAndDelete({ user: userId, offer: offerId });
  }
}
