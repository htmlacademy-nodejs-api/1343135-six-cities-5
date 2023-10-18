import { UserTypeValue } from './user-type.enum.js';

export type User = {
  name: string;
  email: string;
  type: UserTypeValue;
  avatar?: string;
};
