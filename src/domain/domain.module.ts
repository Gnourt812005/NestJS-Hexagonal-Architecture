import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ImageMetadataUseCase } from './use-cases/image-metadata.use-case';
import { ImageUploadUseCase } from './use-cases/image-upload.use-case';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: "IImageMetadataPort",
      useClass: ImageMetadataUseCase
    },
    {
      provide: "IImageUploadPort",
      useClass: ImageUploadUseCase
    }
  ],
  exports: ["IImageMetadataPort", "IImageUploadPort"],
})
export class DomainModule {}
