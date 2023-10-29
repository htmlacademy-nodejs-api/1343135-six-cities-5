import { City } from '../../../types/city.enum.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import { Feature } from '../../../types/feature.enum.js';

export const OfferValidation = {
  title: {
    rule: {
      minLength: 10,
      maxLength: 100,
    },
    message: {
      format: 'title is required',
      length: 'min length is 10, max is 100'
    }
  },
  description: {
    rule: {
      minLength: 20,
      maxLength: 1024,
    },
    message: {
      format: 'description is required',
      length: 'min length is 20, max is 1024'
    }
  },
  city: {
    message: {
      format: 'city is required',
      value: `city must be one of: ${Object.values(City).join(', ')}`
    }
  },
  preview: {
    message: {
      format: 'preview is required',
      value: 'must be a valid url'
    }
  },
  photos: {
    rule: {
      length: 6,
    },
    message: {
      format: 'photos must be an array',
      length: 'must contain 6 items',
      value: 'each item must be a valid url'
    }
  },
  isPremium: {
    message: {
      format: 'isPremium must be a boolean',
    },
  },
  housingType: {
    message: {
      format: 'housingType is required',
      value: `housingType must be one of: ${Object.values(HousingType).join(', ')}`
    }
  },
  roomCount: {
    rule: {
      min: 1,
      max: 8,
    },
    message: {
      format: 'roomCount must be an integer',
      value: 'min value is 1, max is 8'
    }
  },
  tenantCount: {
    rule: {
      min: 1,
      max: 10,
    },
    message: {
      format: 'tenantCount must be an integer',
      value: 'min value is 1, max is 10'
    }
  },
  price: {
    rule: {
      min: 100,
      max: 100000,
    },
    message: {
      format: 'price must be an integer',
      value: 'min value is 100, max is 100000'
    }
  },
  features: {
    rule: {
      minLength: 1,
    },
    message: {
      format: 'features must be an array',
      minLength: 'must contain at least 1 item',
      value: `features can include: ${Object.values(Feature).join(', ')}`
    },
  },
  location: {
    message: {
      format: 'location must be an array of 2 items: longitude and latitude',
    },
  },
  authorId: {
    message: {
      format: 'authorId must be a valid id'
    }
  }
} as const;
