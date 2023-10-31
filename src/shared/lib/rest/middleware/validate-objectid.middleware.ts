import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { RequestFieldValue } from '../types/index.js';
import { HttpError } from '../errors/index.js';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(
    private readonly source: RequestFieldValue,
    private readonly param: string,
  ) {}

  public execute(req: Request, _res: Response, next: NextFunction) {
    const id = req[this.source][this.param];

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
