import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IImageStorage } from '../port/output/image-storage.repository';
import { IImageUploadPort } from '../port/input/image-upload.port';

@Injectable()
export class ImageUploadUseCase implements IImageUploadPort {
  constructor(
    @Inject('IImageStorage')
    private imageStorage: IImageStorage,
  ) {}

  async upload(file: Express.Multer.File, fileName: string): Promise<string> {
    if (!file) {
      throw new InternalServerErrorException(
        'Service: File or file buffer is missing',
      );
    }
    const res = await this.imageStorage.upload(file, fileName);
    return res.url;
  }

  async getUrl(key: string): Promise<string> {
    const res = await this.imageStorage.getUrl(key);
    return res.url;
  }

  async remove(key: string): Promise<boolean> {
    const res = await this.imageStorage.remove(key);
    return res.status;
  }
}
