import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { DocumentExists } from '../../../types/document-exists.interface.js';
import { HttpError } from '../errors/index.js';
import { RequestFieldValue } from '../types/index.js';

export class DocumentExistsMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentExists,
    private readonly entityName: string,
    private readonly source: RequestFieldValue,
    private readonly paramName: string,
  ) {}

  async execute(req: Request, _res: Response, next: NextFunction) {
    const id = req[this.source][this.paramName];
    const exists = await this.service.exists(id);

    if (!exists) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with id ${id} not found`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
