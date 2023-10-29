import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Pagination } from '../../types/pagination.js';
import { OfferShortRdo } from '../offer/index.js';
import { RequestBody, RequestParams } from '../../lib/rest/types/index.js';

type CreateDeleteRequestBody = { offerId: string; userId: string };
export type IndexFavoriteRequest = Request<ParamsDictionary | { userId: string }, OfferShortRdo, RequestBody, Pagination>
export type CreateFavoriteRequest = Request<RequestParams, OfferShortRdo, CreateDeleteRequestBody>
export type DeleteFavoriteRequest = Request<ParamsDictionary, Record<string, never>, CreateDeleteRequestBody>
