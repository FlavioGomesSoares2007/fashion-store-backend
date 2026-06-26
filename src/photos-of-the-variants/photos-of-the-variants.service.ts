import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotosOfTheVariants } from './entities/photos-of-the-variants.entity';
import { Repository } from 'typeorm';
import { ProductVariant } from '../variations/entities/variations.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PhotosOfTheVariantsService {
  constructor(
    @InjectRepository(PhotosOfTheVariants)
    private readonly photosOfTheVariantsRepository: Repository<PhotosOfTheVariants>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(file: Express.Multer.File, id: string) {
    const variant = await this.productVariantRepository.findOne({
      where: { id: id },
    });
    if (!variant) {
      throw new NotFoundException(`Product variant with ID "${id}" not found.`);
    }
    const midia = await this.cloudinary.uploadFile(file);
    return await this.photosOfTheVariantsRepository.save({
      img: midia.secure_url,
    });
  }
}
