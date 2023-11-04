import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { DocumentExists } from '../../../types/document-exists.interface.js';
import { HttpError } from '../errors/index.js';
import { RequestSelector } from '../types/index.js';

export class DocumentExistsMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentExists,
    private readonly entityName: string,
    private readonly select: RequestSelector<string>,
  ) {}

  async execute(req: Request, _res: Response, next: NextFunction) {
    const id = this.select(req);
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
