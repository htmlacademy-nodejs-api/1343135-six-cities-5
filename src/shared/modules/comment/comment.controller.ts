import { injectable, inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../lib/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/logger.interface.js';
import { Response } from 'express';
import { HttpMethod } from '../../lib/rest/types/http-method.enum.js';
import { CreateCommentRequest, IndexCommentRequest } from './types.js';
import { CommentService } from './comment-service.interface.js';
import { HttpError } from '../../lib/rest/errors/http-error.js';
import { fillDto, fillParams } from '../../utils/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { Pagination } from '../../types/pagination.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Post, handler: this.create });
  }

  private async index(req: IndexCommentRequest, res: Response) {
    if (!req.params.offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Bad request');
    }

    const comments = await this.commentService.findByOfferId(
      req.params.offerId,
      fillParams(Pagination, req.query)
    );

    this.ok(res, fillDto(CommentRdo, comments));
  }

  private async create(req: CreateCommentRequest, res: Response) {
    if (!req.params.offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Bad request');
    }
    const comment = await this.commentService.create({...req.body, offerId: req.params.offerId });

    this.created(res, fillDto(CommentRdo, comment));
  }
}
