import { Module } from '@nestjs/common';
import { VariationsController } from './variations.controller';
import { VariationsService } from './variations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './entities/variations.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariant]), CloudinaryModule],
  controllers: [VariationsController],
  providers: [VariationsService],
})
export class VariationsModule {}
