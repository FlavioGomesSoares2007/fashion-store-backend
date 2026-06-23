import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
  name!: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description?: string;

  @IsString({ message: 'Category ID must be a string' })
  @IsNotEmpty({ message: 'Category ID cannot be empty' })
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  categoryId!: string;
}
