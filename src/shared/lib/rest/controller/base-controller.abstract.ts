import { injectable } from 'inversify';
import { Router, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Controller } from './controller.interface.js';
import { Logger } from '../../logger/index.js';
import { Route } from '../types/route.interface.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(
    protected readonly logger: Logger
  ) {
    this._router = Router();
  }

  public addRoute(route: Route) {
    const withAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewaresWithAsyncHandler = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware))
    ) ?? [];
    this._router[route.method](
      route.path,
      [...middlewaresWithAsyncHandler, withAsyncHandler]
    );
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public get router() {
    return this._router;
  }

  public send<T>(res: Response, statusCode: number, data: T) {
    res
      .contentType(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .send(data);
  }

  public ok<T>(res: Response, data: T) {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T) {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: Response) {
    this.send(res, StatusCodes.NO_CONTENT, undefined);
  }
}
