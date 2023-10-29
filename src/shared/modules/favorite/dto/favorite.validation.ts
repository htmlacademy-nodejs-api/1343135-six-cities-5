export const FavoriteValidation = {
  offerId: {
    message: {
      format: 'offerId must be a valid id'
    }
  },
  userId: {
    message: {
      format: 'userId must be a valid id'
    }
  }
} as const;
