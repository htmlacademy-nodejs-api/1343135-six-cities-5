import { injectable, inject } from 'inversify';
import { BaseController } from '../../lib/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/logger.interface.js';
import { Response } from 'express';
import { HttpMethod } from '../../lib/rest/types/http-method.enum.js';
import { CreateCommentRequest, IndexCommentRequest } from './comment.types.js';
import { CommentService } from './comment-service.interface.js';
import { fillDto, fillParams } from '../../utils/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { Pagination } from '../../types/pagination.js';
import { ValidateObjectIdMiddleware } from '../../lib/rest/middleware/validate-objectid.middleware.js';
import { DocumentExistsMiddleware, PrivateRouteMiddleware, ValidateDtoMiddleware } from '../../lib/rest/middleware/index.js';
import { CreateCommentDto } from './index.js';
import { OfferService } from '../offer/index.js';
import { UserService } from '../user/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
  ) {
    super(logger);

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          (req) => req.tokenPayload!.id,
        ),
        new ValidateDtoMiddleware(CreateCommentDto, (req) => req.body),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: CreateCommentRequest) => req.body.offerId,
        ),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware((req: IndexCommentRequest) => req.params.offerId),
        new DocumentExistsMiddleware(
          this.offerService,
          'Offer',
          (req: IndexCommentRequest) => req.params.offerId,
        ),
      ],
    });
  }

  private async create(req: CreateCommentRequest, res: Response) {
    const comment = await this.commentService.create({
      ...req.body,
      authorId: req.tokenPayload!.id,
    });

    this.created(res, fillDto(CommentRdo, comment));
  }

  private async index(req: IndexCommentRequest, res: Response) {
    const comments = await this.commentService.findByOfferId(
      req.params.offerId,
      fillParams(Pagination, req.query)
    );

    this.ok(res, fillDto(CommentRdo, comments));
  }
}
