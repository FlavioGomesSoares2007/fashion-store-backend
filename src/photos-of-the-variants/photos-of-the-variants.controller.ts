import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PhotosOfTheVariantsService } from './photos-of-the-variants.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Roles('admin')
@UseGuards(AuthGuard, RolesGuard)
@Controller('photos-of-the-variants')
export class PhotosOfTheVariantsController {
  constructor(
    private readonly photosOfTheVariantsService: PhotosOfTheVariantsService,
  ) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.photosOfTheVariantsService.create(file, id);
  }
  @Get(':id')
  findAll(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.photosOfTheVariantsService.findAll(id);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.photosOfTheVariantsService.update(id, file);
  }
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.photosOfTheVariantsService.delete(id);
  }
}
