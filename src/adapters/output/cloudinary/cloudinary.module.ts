import { Module } from '@nestjs/common';
import { CloudinaryStorageRepository } from './cloudinary.repository';
import { CloudinaryProvider } from './cloudinary.provider';
import { MyLoggerModule } from 'src/my-logger/my-logger.module';

@Module({
  imports: [MyLoggerModule],
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
