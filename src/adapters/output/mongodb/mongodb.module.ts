import { Module } from '@nestjs/common';
import { MongodbRepository } from './mongodb.repository';

@Module({
  providers: [
    {
      provide: "MongodbRepository",
      useClass: MongodbRepository
    }
  ],
  exports: [
    'MongodbRepository'
  ]
})
export class MongodbModule {}
