import { Inject, Injectable } from '@nestjs/common';
import { IImageMetadataDb } from '../output/image-metadata-db.repository';

@Injectable()
export class ImageMetadataService {
  constructor(
    @Inject('IImageMetadataDb')
    private imageMetadataDb: IImageMetadataDb,
  ) {}

  async createMetadata() {
    const res = await this.imageMetadataDb.createMetadata()
    return res.id
  }

  async createVersion(id: string, publicUrl: string) {
    const res = await this.imageMetadataDb.createNewVersion(
      id,
      publicUrl
    )
    return res 
  }

  async updateVersionActive(id: string, versionIndex: number) {
    const res = await this.imageMetadataDb.updateVersion(id, versionIndex);
    return res
  }
}
