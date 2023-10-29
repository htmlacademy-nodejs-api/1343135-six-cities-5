import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import validator from 'class-validator';
import { Middleware } from './middleware.interface.js';
import { getValidationError } from '../../../utils/common.js';

export class ValidateDtoMiddleware implements Middleware {
  constructor(
    private readonly dto: ClassConstructor<object>,
    private readonly defaultErrorMessage?: string,
  ) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance(this.dto, req.body);
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
