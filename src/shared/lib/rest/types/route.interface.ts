import { Request, Response, NextFunction } from 'express';
import { HttpMethodValue } from './http-method.enum.js';

export interface Route {
  path: string;
  method: HttpMethodValue;
  handler: (req: Request, res: Response, next: NextFunction) => void
}
