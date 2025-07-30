import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { RestfulImageUploadModule } from './adapters/input/restful-image-upload/restful-image-upload.module';
import { ConfigModule } from '@nestjs/config';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeLoggerInterceptor } from './time-logger/time-logger.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MyLoggerModule,
    InfrastructureModule,
    RestfulImageUploadModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeLoggerInterceptor,
    },
  ],
})
export class AppModule {}
