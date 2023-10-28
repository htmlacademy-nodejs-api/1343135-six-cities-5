import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Pagination } from '../../types/pagination.js';
import { RequestBody } from '../../lib/rest/types/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentDto } from './index.js';

export type IndexCommentRequest = Request<{ offerId: string } | ParamsDictionary, CommentRdo, RequestBody, Pagination>
export type CreateCommentRequest = Request<{ offerId: string } | ParamsDictionary, CommentRdo, Omit<CreateCommentDto, 'offerId'>>
