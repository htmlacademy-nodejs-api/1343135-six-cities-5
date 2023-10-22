import { Expose } from 'class-transformer';
import { UserTypeValue } from '../../../types/user-type.enum.js';

export class UserRdo {
  @Expose()
    id: string;

  @Expose()
    name: string;

  @Expose()
    email: string;

  @Expose()
    type: UserTypeValue;

  @Expose()
    avatar?: string;
}
