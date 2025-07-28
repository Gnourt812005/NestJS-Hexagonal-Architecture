import { Module } from '@nestjs/common';
import { CloudinaryStorageRepository } from './cloudinary.repository';

@Module({
  providers: [
    {
      provide: 'CloudinaryStorageRepository',
      useClass: CloudinaryStorageRepository,
    },
  ],
  exports: ['CloudinaryStorageRepository'],
})
export class CloudinaryModule {}
