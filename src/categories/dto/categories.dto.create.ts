import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'The category name is required.' })
  @IsString({ message: 'The category name must be a string.' })
  @Length(3, 100, { message: 'The category name must be between 3 and 100 characters.' })
  name!: string;
}