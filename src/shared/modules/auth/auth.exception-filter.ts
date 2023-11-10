import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../lib/rest/errors/http-error.js';
import { ExceptionFilter } from '../../lib/rest/exception-filter/index.js';
import { AuthException } from './errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../lib/logger/index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {}

  catch(error: Error | HttpError, _req: Request, res: Response, next: NextFunction) {
    if (!(error instanceof AuthException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(StatusCodes.UNAUTHORIZED)
      .json({
        type: 'AUTHORIZATION',
        error: 'Invalid email or password',
      });
  }
}
