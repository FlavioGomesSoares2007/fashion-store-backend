import { Module } from '@nestjs/common';
import { PhotosOfTheVariantsService } from './photos-of-the-variants.service';
import { PhotosOfTheVariantsController } from './photos-of-the-variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosOfTheVariants } from './entities/photos-of-the-variants.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ProductVariant } from '../variations/entities/variations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhotosOfTheVariants, ProductVariant]),
    CloudinaryModule,
  ],
  providers: [PhotosOfTheVariantsService],
  controllers: [PhotosOfTheVariantsController],
})
export class PhotosOfTheVariantsModule {}
