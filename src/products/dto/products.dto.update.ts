import { IsNotEmpty, IsString, IsUUID, Length, IsOptional } from "class-validator";

export class UpdateProductDto {
  @IsOptional() 
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio caso seja enviado' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'A Categoria deve ser um texto' })
  @IsNotEmpty({ message: 'O ID da categoria não pode ser vazio' })
  @IsUUID('4', { message: 'O ID da categoria deve ser um UUID válido' })
  categoryId?: string;
}