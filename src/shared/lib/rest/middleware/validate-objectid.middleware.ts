import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { RequestSelector } from '../types/index.js';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(
    private readonly select: RequestSelector<string>,
  ) {}

  public execute(req: Request, _res: Response, next: NextFunction) {
    const id = this.select(req);

    if (Types.ObjectId.isValid(id)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${id} is invalid ObjectID`,
      'ValidateObjectIdMiddleware',
    );
  }
}
