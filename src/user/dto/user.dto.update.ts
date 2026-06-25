import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a text string.' })
  @IsNotEmpty({ message: 'Full name is required.' })
  name!: string;
  
  @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email!: string;

  @IsOptional()
  @IsString({ message: 'CPF must be a text string.' })
  @IsNotEmpty({ message: 'CPF is required.' })
  @Length(11, 14, { message: 'CPF must contain 11 digits.' })
  cpf!: string;

  @IsOptional()
  @IsString({ message: 'Password must be a text string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password!: string;
}
