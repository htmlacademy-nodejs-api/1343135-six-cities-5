export const Feature = {
  Breakfast: 'Breakfast',
  AirConditioning: 'Air conditioning',
  LaptopFriendlyWorkspace: 'Laptop friendly workspace',
  BabySeat: 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge',
} as const;

export type FeatureValue = typeof Feature[keyof typeof Feature];
