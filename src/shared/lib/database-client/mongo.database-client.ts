import { setTimeout } from 'node:timers/promises';
import { connect, Mongoose } from 'mongoose';
import { injectable, inject } from 'inversify';
import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../logger/index.js';

const RETRY_COUNT = 3;
const RETRY_TIMEOUT = 3000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private isConnected: boolean;
  private connection: Mongoose;

  constructor(
    @inject(Component.Logger) private logger: Logger
  ) {}

  public async connect(url?: string) {
    if (!url) {
      const error = new Error('Database connection URL must be provided');
      this.logger.error(error.message, error);
      throw error;
    }

    if (this.isConnected) {
      const error = new Error('Already connected to the database');
      this.logger.error(error.message, error);
      throw error;
    }

    this.logger.info('Trying to connect to database');

    let atemptCount = 0;

    while (atemptCount < RETRY_COUNT) {
      atemptCount++;
      try {
        this.connection = await connect(url);
        this.isConnected = true;
        this.logger.info('Database is connected');
        return;
      } catch(error) {
        this.logger.warn(`Connection to database failed. Attempt #${atemptCount}`);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error('Failed to connect to the database');
  }

  disconnect() {
    return this.connection?.disconnect();
  }

}
