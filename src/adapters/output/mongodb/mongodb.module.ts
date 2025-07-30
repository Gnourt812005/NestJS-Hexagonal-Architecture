import { Module } from '@nestjs/common';
import { MongodbRepository } from './mongodb.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Metadata, MetadataSchema } from './schemas/metadata.schema';
import { Version, VersionSchema } from './schemas/version.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      (process.env.MONGODB_URI as string) ||
        'mongodb+srv://txt812005:todolist@db-todolist.4enkypn.mongodb.net/image?retryWrites=true&w=majority&appName=db-todolist',
    ),
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
