import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http-error.js';

export interface ExceptionFilter {
  catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void;
}
