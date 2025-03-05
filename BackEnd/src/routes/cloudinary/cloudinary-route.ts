import { NextFunction, Request, Response, Router } from 'express';
import uploadCloud from '../../configs/cloudinary-config.js';
import { ErrorHandler } from '../../utils/error-handling.js';
import { errorMessage } from '../../utils/message/error-message.js';

const route = Router();

route.post(
  '/cloudinary-upload',
  uploadCloud.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      next(new ErrorHandler(errorMessage.fileUploadNotFound, 404));
    }
    res.json({secure_url: req.file?.path});
  }
);

export { route as CloudinaryStorageRoute };
