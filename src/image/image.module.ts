import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageUploadService } from './domain/port/input/image-upload.service';

@Module({
  providers: [
    ImageService,
    ImageUploadService
  ]
})
export class ImageModule {}
