import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from './entities/variations.entity';
import { Repository } from 'typeorm';
import { CreateProductVariantDto } from './dto/variations.dto.create';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateProductVariantDto } from './dto/variations.dto.update';

@Injectable()
export class VariationsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly variationRepository: Repository<ProductVariant>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    dados: CreateProductVariantDto,
    idProduct: string,
    file: Express.Multer.File,
  ): Promise<ProductVariant> {
    const existingVariant = await this.variationRepository.findOne({
      where: { sku: dados.sku },
    });
    if (existingVariant) {
      throw new Error(
        `Product variant with SKU "${dados.sku}" already exists.`,
      );
    }

    const newMidia = await this.cloudinaryService.uploadFile(file);
    const newVariant = this.variationRepository.create({
      ...dados,
      variant_cover: newMidia.secure_url,
      product: { id: idProduct },
    });
    return this.variationRepository.save(newVariant);
  }
  async findOnProduct(id: string): Promise<ProductVariant[]> {
    const variations = await this.variationRepository.find({
      where: { product: { id } },
    });
    if (!variations) {
      throw new Error(
        `No variations of the product with the ID "${id}" were found.`,
      );
    }
    return variations;
  }
async update(
    id: string,
    updateVariantDto: UpdateProductVariantDto,
    file?: Express.Multer.File,
  ): Promise<ProductVariant> {
    const variant = await this.variationRepository.findOne({ where: { id } });
    if (!variant) {
      throw new Error(`Product variant with ID "${id}" not found.`);
    }

    if (file) {
      if (variant.variant_cover) {
        try {
          const publicId = this.cloudinaryService.extractPublicIdFromUrl(variant.variant_cover);
          if (publicId) {
            await this.cloudinaryService.deleteFile(publicId);
          }
        } catch (error) {
          console.error('Erro ao tentar deletar o arquivo antigo do Cloudinary:', error);
        }
      }

      const newMidia = await this.cloudinaryService.uploadFile(file);
      variant.variant_cover = newMidia.secure_url;
    }

    Object.assign(variant, updateVariantDto);
    
    return this.variationRepository.save(variant);
  }
  async delete(id: string) {
    const variant = await this.variationRepository.findOne({ where: { id } });
    if (!variant) {
      throw new Error(`Product variant with ID "${id}" not found.`);
    }
    await this.variationRepository.remove(variant);
  }
}
