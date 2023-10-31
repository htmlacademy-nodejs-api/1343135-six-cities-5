import { UserType } from '../../../types/user-type.enum.js';

export const UserValidation = {
  name: {
    rule: {
      minLength: 1,
      maxLength: 15,
    },
    message: {
      format: 'name is required',
      length: 'min length is 1, max is 15'
    }
  },
  email: {
    message: {
      format: 'email is required',
      value: 'must be a valid email'
    }
  },
  password: {
    rule: {
      minLength: 6,
      maxLength: 12,
    },
    message: {
      format: 'password is required',
      length: 'min length is 6, max is 12'
    }
  },
  type: {
    message: {
      format: 'type is required',
      value: `type must be one of: ${Object.values(UserType).join(', ')}`
    }
  },
  avatar: {
    formats: ['.jpg', '.jpeg', '.png'],
    message: {
      format: 'avatar must be a string',
      value: 'avatar must be a valid url to .jpg or .png image',
    },
  },
} as const;
