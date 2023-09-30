import { pino, Logger as PinoInstance } from 'pino';
import { Logger } from './logger.interface.js';

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    this.logger = pino({ level: 'debug' });
  }

  public debug(msg: string, ...args: unknown[]): void {
    this.logger.debug(msg, ...args);
  }

  public info(msg: string, ...args: unknown[]): void {
    this.logger.info(msg, ...args);
  }

  public warn(msg: string, ...args: unknown[]): void {
    this.logger.warn(msg, ...args);
  }

  public error(msg: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, msg, ...args);
  }
}
