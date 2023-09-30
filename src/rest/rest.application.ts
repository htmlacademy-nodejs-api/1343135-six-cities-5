import { RestConfigSchema, Config } from '../shared/lib/config/index.js';
import { Logger } from '../shared/lib/logger/logger.interface.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger,
    private readonly config: Config<RestConfigSchema>
  ) {}

  public init() {
    this.logger.info(`PORT=${this.config.get('PORT')}`);
    this.logger.info('RestApplication started');
  }
}
