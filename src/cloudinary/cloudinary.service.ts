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

    const isImage = file.mimetype.startsWith('image/');
    if (!isImage) {
      throw new BadRequestException(
        'Apenas arquivos de imagem são permitidos para as roupas.',
      );
    }

    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: 'fashion-store-media',
        resource_type: 'image' as const,
        format: 'webp',
        transformation: [
          {
            width: 800,
            crop: 'limit',
            quality: 'auto',
          },
        ],
      };

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
  async deleteFile(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }
  extractPublicIdFromUrl(url: string) {
    if (!url) return '';

    const parts = url.split('/upload/');
    if (parts.length < 2) return '';

    const publicIdWithExtension = parts[1].replace(/^v\d+\//, '');

    const publicId = publicIdWithExtension.substring(
      0,
      publicIdWithExtension.lastIndexOf('.'),
    );

    return publicId;
  }
}
