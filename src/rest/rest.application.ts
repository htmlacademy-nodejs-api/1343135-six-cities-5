import { inject, injectable } from 'inversify';
import { RestConfigSchema, Config } from '../shared/lib/config/index.js';
import { Logger } from '../shared/lib/logger/logger.interface.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestConfigSchema>,
  ) {}

  public init() {
    this.logger.info(`PORT=${this.config.get('PORT')}`);
    this.logger.info('RestApplication started');
  }
}
