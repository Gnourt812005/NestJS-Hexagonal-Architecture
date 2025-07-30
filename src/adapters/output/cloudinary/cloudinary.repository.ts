import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IImageStorage } from 'src/domain/port/output/image-storage.repository';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryStorageRepository implements IImageStorage {
  constructor(private logger: MyLoggerService) {}

  async upload(
    file: Express.Multer.File,
    filename?: string,
  ): Promise<{ url: string; key: string }> {
    const now = Date.now();
    if (!file) {
      throw new InternalServerErrorException('File or file buffer is missing');
    }

    const data = await new Promise<
      UploadApiResponse | UploadApiErrorResponse | undefined
    >((resolve, reject) => {
      const uploadStartTime = Date.now();
      const uploadedImage = cloudinary.uploader
        .upload_stream(
          {
            public_id: filename,
            resource_type: 'image',
            eager: [],
            quality_analysis: false,
            chunk_size: 6000000,
          },
          (error, result) => {
            if (error) return reject(error);
            this.logger.log(
              `Cloudinary API responded in ${Date.now() - uploadStartTime}ms`,
            );
            resolve(result);
          },
        )
        .end(file.buffer);
      // streamifier.createReadStream(file.buffer).pipe(uploadedImage)
    });

    this.logger.log(`Cloudinary.upload completed in ${Date.now() - now}ms`);

    if (data) return { url: data.secure_url, key: data.public_id };
    throw new InternalServerErrorException();
  }
  async getUrl(key: string): Promise<{ url: string }> {
    return { url: 'abc.com' };
  }
  async remove(key: string): Promise<{ status: boolean }> {
    return { status: true };
  }
}
