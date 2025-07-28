import { Module } from '@nestjs/common';
import { CloudinaryStorageRepository } from './cloudinary.repository';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [
    CloudinaryProvider,
    {
      provide: 'CloudinaryStorageRepository',
      useClass: CloudinaryStorageRepository,
    },
  ],
  exports: ['CloudinaryStorageRepository'],
})
export class CloudinaryModule {}
