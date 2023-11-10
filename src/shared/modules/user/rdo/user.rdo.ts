import { Expose } from 'class-transformer';
import { UserTypeValue } from '../../../types/user-type.enum.js';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public type: UserTypeValue;

  @Expose()
  public avatar?: string;
}
