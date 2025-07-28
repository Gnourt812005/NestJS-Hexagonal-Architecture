import { Inject, Injectable } from '@nestjs/common';
import { IImageStorage } from 'src/domain/port/output/image-storage.repository';

@Injectable()
export class CloudinaryStorageRepository implements IImageStorage{
  async upload(file: Express.Multer.File, filename?: string): Promise<{ url: string; key: string }> {
    return { url: "abc.com", key: "123"}
  }
  async getUrl(key: string): Promise<{url: string}> {
    return { url: "abc.com" }
  }
  async remove(key: string): Promise<{status: boolean}> {
    return { status: true }
  }
}
