import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { createReadStream } from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor() {}
  uploadFile(
    file: any,
    productId: string,
    index: number = 0,
  ): Promise<CloudinaryResponse> {
    file.filename = `${productId}-${index}`;
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ECE-Project',
          public_id: file.filename,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async removeFileFromUrl(imageUrl: string): Promise<CloudinaryResponse> {
    const publicId = `ECE-Project/${imageUrl.split('/').pop().split('.')[0]}`;
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
