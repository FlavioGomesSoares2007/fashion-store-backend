import { Module } from '@nestjs/common';
import { VariationsController } from './variations.controller';
import { VariationsService } from './variations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './entities/variations.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariant])],
  controllers: [VariationsController],
  providers: [VariationsService, CloudinaryService],
})
export class VariationsModule {}
