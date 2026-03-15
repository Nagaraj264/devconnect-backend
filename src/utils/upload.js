import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createUploader = (folderName, isAvatar = false) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName,
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: isAvatar 
        ? [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }] 
        : [{ width: 1200, crop: 'limit' }] 
    },
  });

  return multer({ storage: storage });
};

export const uploadAvatar = createUploader('devconnect_avatars', true);
export const uploadPostImage = createUploader('devconnect_posts', false);