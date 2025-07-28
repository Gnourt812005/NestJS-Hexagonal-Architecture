import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { RestfulImageUploadModule } from './adapters/input/restful-image-upload/restful-image-upload.module';

@Module({
  imports: [DomainModule, InfrastructureModule, RestfulImageUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
