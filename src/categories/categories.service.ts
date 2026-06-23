import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/categories.entity';
import { CreateCategoryDto } from './dto/categories.dto.create';
import { UpdateCategoryDto } from './dto/categories.dto..update';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(categoryCreateDto: CreateCategoryDto): Promise<Category> {
    const { name } = categoryCreateDto;

    const categoryExists = await this.categoryRepository.findOne({
      where: { name },
    });
    if (categoryExists) {
      throw new ConflictException(
        `Category with name "${name}" already exists.`,
      );
    }

    const newCategory = this.categoryRepository.create(categoryCreateDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: { name: 'ASC' },
      
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found.`);
    }

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (updateCategoryDto.name) {
      const categoryWithSameName = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (categoryWithSameName && categoryWithSameName.id !== id) {
        throw new ConflictException(
          `Category with name "${updateCategoryDto.name}" already exists.`,
        );
      }
    }

    const updatedCategory = this.categoryRepository.merge(
      category,
      updateCategoryDto,
    );
    return await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);
  }
}
