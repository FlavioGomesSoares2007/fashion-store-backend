import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsUUID,
  IsPositive,
  Min,
  Length,
  IsOptional,
} from 'class-validator';

export class UpdateProductVariantDto {
  @IsOptional()
  @IsString({ message: 'SKU must be a string' })
  @IsNotEmpty({ message: 'SKU cannot be empty' })
  @Length(3, 50, { message: 'SKU must be between 3 and 50 characters' })
  sku?: string;

  @IsOptional()
  @IsString({ message: 'Size must be a string' })
  @IsNotEmpty({ message: 'Size cannot be empty' })
  @Length(1, 20, { message: 'Size must be between 1 and 20 characters' })
  size?: string;

  @IsOptional()
  @IsString({ message: 'Color must be a string' })
  @IsNotEmpty({ message: 'Color cannot be empty' })
  @Length(2, 50, { message: 'Color must be between 2 and 50 characters' })
  color?: string;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with up to 2 decimal places' },
  )
  @IsNotEmpty({ message: 'Price cannot be empty' })
  @IsPositive({ message: 'Price must be a positive value' })
  price?: number;

  @IsOptional()
  @IsInt({ message: 'Stock quantity must be an integer' })
  @Min(0, { message: 'Stock quantity cannot be less than 0' })
  @IsOptional()
  stockQuantity?: number;

  @IsOptional()
  @IsString({ message: 'Product ID must be a string' })
  @IsNotEmpty({ message: 'Product ID cannot be empty' })
  @IsUUID('4', { message: 'Product ID must be a valid UUID' })
  productId?: string;
}
