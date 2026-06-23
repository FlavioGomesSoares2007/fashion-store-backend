import 'multer';
import { Injectable, BadRequestException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }

    const isVideo = file.mimetype.startsWith('video/');
    const resourceType = isVideo ? 'video' : 'image';

    return new Promise((resolve, reject) => {
      const uploadOptions: any = {
        folder: 'fashion-store-media',
        resource_type: resourceType,
      };

      if (!isVideo) {
        uploadOptions.transformation = [
          {
            width: 800,
            crop: 'limit',
            quality: 'auto',
            fetch_format: 'auto',
          },
        ];
      } else {
        uploadOptions.transformation = [
          {
            quality: 'auto',
            fetch_format: 'auto',
          },
        ];
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          if (result) return resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
