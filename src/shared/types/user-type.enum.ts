export const UserType = {
  Default: 'default',
  Pro: 'pro',
} as const;

export type UserTypeValue = typeof UserType[keyof typeof UserType];
