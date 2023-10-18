import { types } from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import { Pagination } from '../../types/pagination.js';
import { CommentEntity, CommentService, CreateCommentDto } from './index.js';
import { DefaultPaginationParams } from './consts.js';
import { Component } from '../../types/component.enum.js';
import { OfferService } from '../offer/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {}

  public async findByOfferId(id: string, pagination?: Pagination) {
    const calculatedOffset = pagination?.offset ?? DefaultPaginationParams.offset;
    const calculatedLimit = pagination?.limit ?? DefaultPaginationParams.limit;

    return this.commentModel
      .find({ offer: id })
      .sort({ createdAt: -1 })
      .skip(calculatedOffset)
      .limit(calculatedLimit);
  }

  public async create(dto: CreateCommentDto) {
    const comment = await this.commentModel.create({
      ...dto,
      offer: dto.offerId,
      author: dto.authorId,
    });

    await this.offerService.addComment({ offerId: dto.offerId, rating: dto.rating });

    return comment;
  }

  public async deleteByOfferId(offerId: string) {
    const deleteResult = await this.commentModel.deleteMany({ offer: offerId });
    return deleteResult.deletedCount;
  }
}
