import { defaultClasses, prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FavoriteEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity })
    user!: Ref<UserEntity>;

  @prop({ required: true, ref: OfferEntity })
    offer!: Ref<OfferEntity>;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
