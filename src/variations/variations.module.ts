import { Module } from '@nestjs/common';
import { VariationsController } from './variations.controller';
import { VariationsService } from './variations.service';

@Module({
  controllers: [VariationsController],
  providers: [VariationsService]
})
export class VariationsModule {}
