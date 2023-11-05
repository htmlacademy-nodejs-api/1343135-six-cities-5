import { Expose, Transform } from 'class-transformer';

export class CreateFavoriteRdo {
  @Expose({ name: 'offer' })
  @Transform((value) => value.obj.offer.toString())
  public offerId: string;
}
