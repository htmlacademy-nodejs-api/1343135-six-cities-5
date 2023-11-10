export const CreateCommentValidation = {
  text: {
    rule: {
      minLength: 5,
      maxLength: 1024,
    },
    message: {
      format: 'text is required',
      length: 'min length is 5, max is 1024'
    }
  },
  rating: {
    rule: {
      min: 1,
      max: 5,
      maxDecimalPlace: 1,
    },
    message: {
      format: 'rating must be a number with 1 decimal place max, e.g. 4.6',
      value: 'min value is 1, max is 5'
    }
  },
  offerId: {
    message: {
      format: 'offerId must be a valid id'
    }
  }
} as const;
