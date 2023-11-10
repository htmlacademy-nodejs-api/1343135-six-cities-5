import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Pagination } from '../../types/pagination.js';
import { OfferShortRdo } from '../offer/index.js';
import { RequestBody, RequestParams } from '../../lib/rest/types/index.js';

type Id = { offerId: string };
export type IndexFavoriteRequest = Request<ParamsDictionary, OfferShortRdo, RequestBody, Pagination>
export type CreateFavoriteRequest = Request<RequestParams, OfferShortRdo, Id>
export type DeleteFavoriteRequest = Request<ParamsDictionary | Id>
