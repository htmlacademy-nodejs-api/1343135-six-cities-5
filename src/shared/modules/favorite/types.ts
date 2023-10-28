import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Pagination } from '../../types/pagination.js';
import { OfferShortRdo } from '../offer/index.js';
import { RequestBody, RequestParams } from '../../lib/rest/types/index.js';

export type IndexFavoriteRequest = Request<RequestParams, OfferShortRdo, RequestBody, Pagination & { userId?: string }>
export type CreateFavoriteRequest = Request<RequestParams, OfferShortRdo, {offerId: string; userId: string }>
export type DeleteFavoriteRequest = Request<ParamsDictionary | { offerId: string, userId: string; }, Record<string, never>, RequestBody>
