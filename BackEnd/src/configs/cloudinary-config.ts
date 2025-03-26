import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { env } from './env.js';
import { Request } from 'express';

//config for cloudinary
cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  secure: env.SECURE === 'true',
  api_key: env.API_KEY,
  api_secret: env.API_SECRET,
});

//config for multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: env.FOLDER_NAME,
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
    public_id: (req: Request, file: Express.Multer.File) => file.originalname,
  } as any,
});

//config for multer
const uploadCloud = multer({ storage });

export default uploadCloud;
