import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageUploadService } from './domain/port/input/image-upload.service';
import { CloudinaryStorageRepository } from './adapters/output/cloudinary/cloudinary.repository';
import { MongodbRepository } from './adapters/output/mongodb/mongodb.repository';
import { RestfulImageUploadController } from './adapters/input/restful-image-upload.controller';
import { ImageMetadataService } from './domain/port/input/image-metadata.service';

@Module({
  controllers: [RestfulImageUploadController],
  providers: [
    ImageService,
    ImageUploadService, 
    ImageMetadataService,
    ImageUploadService,
    {
      provide: "IImageStorage",
      useClass: CloudinaryStorageRepository
    }, 
    {
      provide: "IImageMetadataDb",
      useClass: MongodbRepository
    }
  ]
})
export class ImageModule {}
