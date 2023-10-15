import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Pagination } from '../../types/pagination.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>
  update(id: OfferEntity['id'], dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>>
  delete(id: OfferEntity['id']): Promise<void>
  findById(id: OfferEntity['id']): Promise<DocumentType<OfferEntity> | null>
  find(pagination?: Pagination): Promise<DocumentType<OfferEntity>[]>
  findPremiumByCity(city: OfferEntity['city'], pagination?: Pagination): Promise<DocumentType<OfferEntity>[]>
  incrementCommentCount(id: OfferEntity['id']): Promise<DocumentType<OfferEntity> | null>
}
