import { validateSync } from 'class-validator';
import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { Middleware } from './middleware.interface.js';
import { TokenPayload } from '../../../modules/auth/auth.types.js';
import { fillDto } from '../../../utils/common.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';

function isToken(payload: unknown): payload is TokenPayload {
  const errors = validateSync(fillDto(TokenPayload, payload));

  return Boolean(errors);
}

@injectable()
export class ParseTokenMiddleware implements Middleware {
  constructor(
    private readonly token: string,
  ){}

  public async execute(req: Request, _res: Response, next: NextFunction) {
    const [, token] = req.headers.authorization?.split(' ') || [];

    if (!token) {
      return next();
    }

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.token, 'utf-8'));

      if (isToken(payload)) {
        req.tokenPayload = payload;
      }

      return next();
    } catch {
      return next(
        new HttpError(
          StatusCodes.UNAUTHORIZED,
          'Invalid token',
          'ParseTokenMiddleware',
        )
      );
    }
  }
}
