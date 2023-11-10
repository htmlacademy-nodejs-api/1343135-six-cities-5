import { Pagination } from '../../types/pagination.js';
import { CreateFavoriteDto, DeleteFavoriteDto, FavoriteEntity } from './index.js';
import { OfferEntity } from '../offer/offer.entity.js';

export interface FavoriteService {
  findByUserId(userId: string, pagination?: Pagination): Promise<OfferEntity[]>
  create(dto: CreateFavoriteDto): Promise<FavoriteEntity>
  delete(dto: DeleteFavoriteDto): Promise<void>
  getFavoriteOfferIds(offerIds: string[], userId?: string): Promise<string[]>
  exists({ offerId, userId }: { offerId: string, userId: string }): Promise<boolean>
}
