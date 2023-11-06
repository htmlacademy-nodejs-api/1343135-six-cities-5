import { Request, Response, NextFunction } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { Validator } from '../../../types/validator.interface.js';

export class FileUploadMiddleware implements Middleware {
  constructor(
    private readonly directory: string,
    private readonly fieldName: string,
    private readonly validator: Validator<Express.Multer.File>,
  ) {}

  execute(req: Request, res: Response, next: NextFunction) {
    const uploadSingleFileMiddleware = multer({
      storage: diskStorage({
        destination: this.directory,
        filename(_req, file, callback) {
          const fileExtension = extension(file.mimetype);
          const fileName = nanoid();
          callback(null, `${fileName}.${fileExtension}`);
        }
      }),
      fileFilter: (_req, file, cb) => {
        const validationResult = this.validator.validate(file);
        if (validationResult.error) {
          return cb(
            new HttpError(
              StatusCodes.BAD_REQUEST,
              validationResult.error.message,
              'FileUploadMiddleware'
            )
          );
        }

        return cb(null, true);
      }
    }).single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
