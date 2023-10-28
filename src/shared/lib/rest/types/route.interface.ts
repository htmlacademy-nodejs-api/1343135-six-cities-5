import { Request, Response, NextFunction } from 'express';
import { HttpMethodValue } from './http-method.enum.js';
import { Middleware } from '../middleware/index.js';

export interface Route {
  path: string;
  method: HttpMethodValue;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
