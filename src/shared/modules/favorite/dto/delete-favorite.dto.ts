import { IsMongoId } from 'class-validator';
import { FavoriteValidation as validation } from './favorite.validation.js';

export class DeleteFavoriteDto {
  public userId: string;

  @IsMongoId({ message: validation.offerId.message.format })
  public offerId: string;
}
