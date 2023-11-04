import { Request } from 'express';

export type RequestSelector<T> = (req: Request) => T;
