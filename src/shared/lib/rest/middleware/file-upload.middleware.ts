import { Request, Response, NextFunction } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';
import { Middleware } from './middleware.interface.js';

export class FileUploadMiddleware implements Middleware {
  constructor(
    private readonly directory: string,
    private readonly fieldName: string,
  ) {}

  execute(req: Request, res: Response, next: NextFunction) {
    const storage = diskStorage({
      destination: this.directory,
      filename(_req, file, callback) {
        const fileExtension = extension(file.mimetype);
        const fileName = nanoid();
        callback(null, `${fileName}.${fileExtension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({storage}).single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
