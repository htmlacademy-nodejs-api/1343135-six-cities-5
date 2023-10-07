import { defaultClasses, prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { City, CityValue } from '../../types/city.enum.js';
import { HousingType, HousingTypeValue } from '../../types/housing-type.enum.js';
import { Feature, FeatureValue } from '../../types/feature.enum.js';
import { Location } from '../../types/location.type.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ required: true, trim: true })
  public description!: string;

  @prop({ required: true })
  public datePublished!: Date;

  @prop({ required: true, enum: City })
  public city!: CityValue;

  @prop({ required: true })
  public preview!: string;

  @prop({ required: true, type: String })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true, enum: HousingType })
  public housingType!: HousingTypeValue;

  @prop({ required: true })
  public roomCount!: number;

  @prop({ required: true })
  public tenantCount!: number;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true, type: String, enum: Feature })
  public features!: FeatureValue[];

  @prop({ required: true, ref: UserEntity })
  public authorId!: Ref<UserEntity>;

  @prop({ required: true, type: [Number, Number] })
  public location!: Location;

  @prop({ required: true, default: 0 })
  public commentCount!: number;

}

export const OfferModel = getModelForClass(OfferEntity);
