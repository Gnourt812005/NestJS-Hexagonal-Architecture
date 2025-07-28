import { Inject, Injectable } from '@nestjs/common';
import { IImageMetadataDb } from 'src/domain/port/output/image-metadata-db.repository';

@Injectable()
export class MongodbRepository implements IImageMetadataDb{
  async createMetadata(): Promise<{id: string}> {
    return {id: "123"}

  }
  async getMetadata(id: string): Promise<any> {
  }
  async deleteMetadata(id: string): Promise<any> {

  }

  async createNewVersion(id: string, url: string): Promise<any> {

  }
  async getActiveVersionIndex(id: string): Promise<{version: number}>{
    return {version: 5}
  }
  async deleteVersion(id: string): Promise<any> {

  }
  async updateVersion(id: string, versionIndex: number): Promise<any> {

  }
}
