import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { CommentEntity } from '../comment.entity.js';

export class CommentRdo {
  @Expose()
  public id: CommentEntity['id'];

  @Expose()
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public text: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public rating: number;
}
