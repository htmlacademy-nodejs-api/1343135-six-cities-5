export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),
  FavoriteService: Symbol.for('FavoriteService'),
  FavoriteModel: Symbol.for('FavoriteModel'),
} as const;
