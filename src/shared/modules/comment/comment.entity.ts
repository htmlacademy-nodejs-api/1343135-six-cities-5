import { defaultClasses, prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
    text!: string;

  @prop({ required: true })
    rating!: number;

  @prop({ required: true, ref: OfferEntity })
    offer!: Ref<OfferEntity>;

  @prop({ required: true, ref: UserEntity })
    author!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
