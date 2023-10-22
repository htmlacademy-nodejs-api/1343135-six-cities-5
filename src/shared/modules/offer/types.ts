import { Request } from 'express';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferShortRdo } from './rdo/offer-short.rdo.js';
import { RequestParams } from '../../lib/rest/types/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CityValue } from '../../types/city.enum.js';
import { Pagination } from '../../types/pagination.js';
import { RequestBody } from '../../lib/rest/types/request-body.type.js';

type IdParams = { id?: string };
export type CreateOfferRequest = Request<RequestParams, OfferRdo, CreateOfferDto>
export type UpdateOfferRequest = Request<IdParams, OfferRdo, UpdateOfferDto>
export type DeleteOfferRequest = Request<IdParams>
export type PremiumForCityRequest = Request<{ city?: CityValue }, OfferShortRdo[], RequestBody, Pagination>
