import { Inject, Injectable } from '@nestjs/common';
import { IImageStorage } from '../output/image-storage.repository';

@Injectable()
export class ImageUploadService {
  constructor (
    @Inject("IImageStorage")
    private imageStorage: IImageStorage
  ) {}

  async upload(file: Express.Multer.File, fileName: string) {
    const res = await this.imageStorage.upload(file, fileName)
    return res.url
  }
  
  async getUrl(key: string) {
    const res = await this.imageStorage.getUrl(key)
    return res.url 
  }
  
  async remove(key: string) {
    const res = await this.remove(key)
    return res.status
  }
}
