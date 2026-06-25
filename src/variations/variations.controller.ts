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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VariationsService } from './variations.service';
import { CreateProductVariantDto } from './dto/variations.dto.create';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Roles('admin')
@UseGuards(AuthGuard, RolesGuard)
@Controller('variations')
export class VariationsController {
  constructor(private readonly variationsService: VariationsService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dados: CreateProductVariantDto,
    @Param('id', new ParseUUIDPipe()) idProduct: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.variationsService.create(dados, idProduct, file);
  }
  @Get(':id')
  findOnProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.variationsService.findOnProduct(id);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dados: CreateProductVariantDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.variationsService.update(id, dados, file);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.variationsService.delete(id);
  }
}
