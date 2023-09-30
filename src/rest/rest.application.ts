import { Logger } from '../shared/lib/logger/logger.interface.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger
  ) {}

  public init() {
    this.logger.info('RestApplication started');
  }
}
