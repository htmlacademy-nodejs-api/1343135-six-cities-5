import { DocumentType } from '@typegoose/typegoose';
import { Pagination } from '../../types/pagination.js';
import { FavoriteEntity } from './favorite.entity.js';
import { CreateFavoriteDto, DeleteFavoriteDto } from './index.js';

export interface FavoriteService {
  findByUserId(userId: string, pagination?: Pagination): Promise<DocumentType<FavoriteEntity>[]>
  create(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity>>
  delete(dto: DeleteFavoriteDto): Promise<void>
}
