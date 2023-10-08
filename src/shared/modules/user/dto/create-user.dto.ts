import { UserTypeValue } from '../../../types/user-type.enum.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public password: string;
  public type?: UserTypeValue;
  public avatar?: string;
}
