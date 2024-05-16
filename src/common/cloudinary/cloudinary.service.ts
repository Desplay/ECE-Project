import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { createReadStream } from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor() {}
  uploadFile(
    file: Express.Multer.File,
    postId: string,
  ): Promise<CloudinaryResponse> {
    file.filename = postId;
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'To-Do-App',
          public_id: postId,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async removeFile(postid: string): Promise<CloudinaryResponse> {
    const file_exist = await cloudinary.api.resource(
      `To-Do-App/${postid}`,
    );
    if (!file_exist) {
      return null;
    }
    return cloudinary.uploader.destroy(`To-Do-App/${postid}`);
  }
}
