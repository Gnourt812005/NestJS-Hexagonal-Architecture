import { Inject, Injectable, Version } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IImageMetadataDb } from 'src/domain/port/output/image-metadata-db.repository';
import { Metadata, MetadataDocument } from './schemas/metadata.schema';
import { Model, Types } from 'mongoose';
import { VersionDocument } from './schemas/version.schema';
import { randomUUID } from 'node:crypto';

@Injectable()
export class MongodbRepository implements IImageMetadataDb {
  constructor(
    @InjectModel(Metadata.name)
    private metadataModel: Model<MetadataDocument>,
    @InjectModel(Version.name)
    private versionModel: Model<VersionDocument>
  ) {}

  async createMetadata(): Promise<{ id: string }> {
    const new_metadata = new this.metadataModel({
      isActive: true
    })
    await new_metadata.save()
    return { id: new_metadata._id.toString() };
  }

  async getMetadata(id: string): Promise<any> {
    const metadata = await this.metadataModel.findById(id).exec()
    return metadata
  }
  
  async deleteMetadata(id: string): Promise<any> {
    const res = await this.metadataModel.deleteOne({
      _id: id 
    })
    if (res.deletedCount = 1) return { status: true }
    return { status: false }
  }

  async createNewVersion(id: string, url: string): Promise<any> {
    const currentVersion = await this.getActiveVersionIndex(id)

    const res = await this.versionModel.deleteMany({
      idImage: id,
      versionIndex: { $gt: currentVersion.version },
    })

    const new_version = new this.versionModel({
      idImage: new Types.ObjectId(id),
      publicUrl: url,
      versionIndex: currentVersion.version + 1,
      isActive: true,
    })

    await new_version.save()
    return new_version
  }

  async getActiveVersionIndex(id: string): Promise<{ version: number }> {
    const lastestVersion = await this.versionModel
      .findOne({ 
        idImage: new Types.ObjectId(id),
        isActive: true
      })
      .exec()
    
    if (!lastestVersion) {
      return { version: -1 }
    }
    return { version: lastestVersion.versionIndex };
  }

  async deleteVersion(id: string): Promise<any> {}
  async updateVersion(id: string, versionIndex: number): Promise<any> {}
}
