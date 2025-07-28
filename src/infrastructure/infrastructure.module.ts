import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/adapters/output/cloudinary/cloudinary.module';
import { MongodbModule } from 'src/adapters/output/mongodb/mongodb.module';

@Module({
  imports: [CloudinaryModule, MongodbModule],
  providers: [
    {
      provide: 'IImageStorage',
      useExisting: 'CloudinaryStorageRepository',
    },
    {
      provide: 'IImageMetadataDb',
      useExisting: 'MongodbRepository',
    },
  ],
  exports: ['IImageStorage', 'IImageMetadataDb'],
})
export class InfrastructureModule {}
