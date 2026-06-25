import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/products.dto.create';
import { UpdateProductDto } from './dto/products.dto.update';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dados: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { name: dados.name },
    });
    if (existingProduct) {
      throw new ConflictException(
        `Product with name "${dados.name}" already exists.`,
      );
    }

    const product = this.productRepository.create({
      ...dados,
      categoryId: { id: dados.categoryId },
    });
    return await this.productRepository.save(product);
  }
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      order: { name: 'ASC' },
    });
  }
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categoryId', 'variants'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }
    return product;
  }
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }
    if (updateProductDto.name) {
      const productWithSameName = await this.productRepository.findOne({
        where: { name: updateProductDto.name },
      });
      if (productWithSameName && productWithSameName.id !== id) {
        throw new ConflictException(
          `Product with name "${updateProductDto.name}" already exists.`,
        );
      }
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }
  async delete(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }
    return this.productRepository.remove(product);
  }
}
