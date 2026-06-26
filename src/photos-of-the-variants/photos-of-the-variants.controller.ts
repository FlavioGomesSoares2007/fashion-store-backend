import {
  Controller,
  Param,
  ParseUUIDPipe,
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
}
