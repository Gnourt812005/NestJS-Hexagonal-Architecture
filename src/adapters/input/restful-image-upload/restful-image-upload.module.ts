import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { RestfulImageUploadController } from './restful-image-upload.controller';

@Module({
  imports: [DomainModule],
  controllers: [RestfulImageUploadController]
})
export class RestfulImageUploadModule {}
