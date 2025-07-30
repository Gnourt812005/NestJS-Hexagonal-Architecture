import { Module } from '@nestjs/common';
import { MongodbRepository } from './mongodb.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Metadata, MetadataSchema } from './schemas/metadata.schema';
import { Version, VersionSchema } from './schemas/version.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Metadata.name, schema: MetadataSchema },
      { name: Version.name, schema: VersionSchema },
    ]),
  ],
  providers: [
    {
      provide: 'MongodbRepository',
      useClass: MongodbRepository,
    },
  ],
  exports: ['MongodbRepository'],
})
export class MongodbModule {}
