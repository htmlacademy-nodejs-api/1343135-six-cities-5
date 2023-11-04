import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import validator from 'class-validator';
import { Middleware } from './middleware.interface.js';
import { RequestSelector } from '../types/index.js';
import { getValidationError } from '../../../utils/validation.js';

export class ValidateDtoMiddleware<T> implements Middleware {
  constructor(
    private readonly dto: ClassConstructor<object>,
    private readonly select: RequestSelector<T>,
    private readonly defaultErrorMessage?: string,
  ) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance(this.dto, this.select(req));
    const errors = await validator.validate(dto);

    if (errors.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({
          error: this.defaultErrorMessage ? this.defaultErrorMessage : getValidationError(errors)
        });
    }

    return next();
  }
}
