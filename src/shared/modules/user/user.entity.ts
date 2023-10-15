import { defaultClasses, modelOptions, prop, getModelForClass } from '@typegoose/typegoose';
import { UserType, UserTypeValue } from '../../types/user-type.enum.js';
import { DEFAULT_AVATAR } from './consts.js';
import { createSha256Hash } from '../../utils/hash.js';
import { User } from '../../types/user.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({ required: true, trim: true, unique: true })
  public email!: string;

  @prop({ required: false })
  public avatar!: string;

  @prop({ required: true, enum: UserType })
  public type!: UserTypeValue;

  @prop({ required: true, trim: true })
  private password?: string;

  constructor(user: User) {
    super();

    this.name = user.name;
    this.email = user.email;
    this.type = user.type;
    this.avatar = user.avatar ?? DEFAULT_AVATAR;
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(input: string, salt: string) {
    this.password = createSha256Hash(input, salt);
  }

  public checkPassword(input: string, salt: string) {
    return this.password === createSha256Hash(input, salt);
  }
}

export const UserModel = getModelForClass(UserEntity);
