import { Module } from '@nestjs/common';
import { ImageUploadService } from './port/input/image-upload.service';
import { ImageMetadataService } from './port/input/image-metadata.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule
  ],
  providers: [
    ImageUploadService, 
    ImageMetadataService,
  ],
  exports: [
    ImageUploadService,
    ImageMetadataService,
  ]
})
export class DomainModule {}
