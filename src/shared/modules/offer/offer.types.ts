import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferShortRdo } from './rdo/offer-short.rdo.js';
import { RequestParams } from '../../lib/rest/types/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CityValue } from '../../types/city.enum.js';
import { Pagination } from '../../types/pagination.js';
import { RequestBody } from '../../lib/rest/types/request-body.type.js';

type IdParams = { id: string };
export type CreateOfferRequest = Request<RequestParams, OfferRdo, Omit<CreateOfferDto, 'authorId'>>
export type ShowOfferRequest = Request<IdParams | ParamsDictionary, OfferRdo, UpdateOfferDto>
export type UpdateOfferRequest = Request<IdParams | ParamsDictionary, OfferRdo, UpdateOfferDto>
export type DeleteOfferRequest = Request<IdParams | ParamsDictionary>
export type PremiumForCityRequest = Request<{ city?: CityValue }, OfferShortRdo[], RequestBody, Pagination>
