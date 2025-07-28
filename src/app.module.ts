import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { RestfulImageUploadModule } from './adapters/input/restful-image-upload/restful-image-upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DomainModule, 
    InfrastructureModule, 
    RestfulImageUploadModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
