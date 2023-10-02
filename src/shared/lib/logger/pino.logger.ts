import { injectable } from 'inversify';
import { pino, transport, Logger as PinoInstance } from 'pino';
import { Logger } from './logger.interface.js';
import { resolve } from 'node:path';
import { getCurrentModuleDirPath } from '../../utils/file-system.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const destination = resolve(getCurrentModuleDirPath(), '../../../', 'logs/rest-app.log');
    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    });

    this.logger = pino({}, multiTransport);
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
