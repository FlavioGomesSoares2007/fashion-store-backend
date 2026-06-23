import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from './entities/variations.entity';
import { Repository } from 'typeorm';
import { CreateProductVariantDto } from './dto/variations.dto.create';

@Injectable()
export class VariationsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly variationRepository: Repository<ProductVariant>,
  ) {}

  async create(
    dados: CreateProductVariantDto,
    idProduct: string,
  ): Promise<ProductVariant> {
    const existingVariant = await this.variationRepository.findOne({
      where: { sku: dados.sku },
    });
    if (existingVariant) {
      throw new Error(
        `Product variant with SKU "${dados.sku}" already exists.`,
      );
    }
    const newVariant = this.variationRepository.create({
      ...dados,
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
    updateVariantDto: CreateProductVariantDto,
  ): Promise<ProductVariant> {
    const variant = await this.variationRepository.findOne({ where: { id } });
    if (!variant) {
      throw new Error(`Product variant with ID "${id}" not found.`);
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
