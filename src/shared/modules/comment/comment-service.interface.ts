import { DocumentType } from '@typegoose/typegoose';
import { Pagination } from '../../types/pagination.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export interface CommentService {
  findByOfferId(id:string, pagination?: Pagination): Promise<DocumentType<CommentEntity>[]>;
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
}
