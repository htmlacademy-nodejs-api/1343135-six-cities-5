import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Pagination } from '../../types/pagination.js';
import { AddCommentDto } from './dto/add-comment.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>
  exists(id: OfferEntity['id']): Promise<boolean>
  update(id: OfferEntity['id'], dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>>
  delete(id: OfferEntity['id']): Promise<void>
  findById(id: OfferEntity['id']): Promise<DocumentType<OfferEntity> | null>
  find(pagination?: Pagination): Promise<DocumentType<OfferEntity>[]>
  findPremiumForCity(city: OfferEntity['city'], pagination?: Pagination): Promise<DocumentType<OfferEntity>[]>
  addComment(dto: AddCommentDto): Promise<DocumentType<OfferEntity> | null>
}
