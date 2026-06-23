import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { VariationsService } from './variations.service';
import { CreateProductVariantDto } from './dto/variations.dto.create';

@Controller('variations')
export class VariationsController {
  constructor(private readonly variationsService: VariationsService) {}

  @Post(':id')
  create(
    @Body() dados: CreateProductVariantDto,
    @Param('id', new ParseUUIDPipe()) idProduct: string,
  ) {
    return this.variationsService.create(dados, idProduct);
  }
  @Get(':id')
  findOnProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.variationsService.findOnProduct(id);
  }
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dados: CreateProductVariantDto,
  ) {
    return this.variationsService.update(id, dados);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.variationsService.delete(id);
  }
}
