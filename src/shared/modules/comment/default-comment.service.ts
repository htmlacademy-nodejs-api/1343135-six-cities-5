import { types } from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import { Pagination } from '../../types/pagination.js';
import { CommentEntity, CommentService, CreateCommentDto } from './index.js';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './consts.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async findByOfferId(id: string, pagination?: Pagination) {
    const calculatedOffset = pagination?.offset ?? DEFAULT_OFFSET;
    const calculatedLimit = pagination?.limit ?? DEFAULT_LIMIT;

    return this.commentModel
      .find({ offer: id })
      .sort({ createdAt: -1 })
      .skip(calculatedOffset)
      .limit(calculatedLimit);
  }

  public async create(dto: CreateCommentDto) {
    return this.commentModel.create(dto);
  }

  public async deleteByOfferId(offerId: string) {
    const deleteResult = await this.commentModel.deleteMany({ offer: offerId });
    return deleteResult.deletedCount;
  }
}
