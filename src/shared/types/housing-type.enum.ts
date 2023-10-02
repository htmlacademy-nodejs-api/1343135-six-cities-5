export const HousingType = {
  Apartment: 'apartment',
  House: 'house',
  Room: 'room',
  Hotel: 'hotel',
} as const;

export type HousingTypeValue = typeof HousingType[keyof typeof HousingType];
