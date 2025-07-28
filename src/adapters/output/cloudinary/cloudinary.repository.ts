import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IImageStorage } from 'src/domain/port/output/image-storage.repository';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

const streamifier = require("streamifier")

@Injectable()
export class CloudinaryStorageRepository implements IImageStorage {
  async upload(
    file: Express.Multer.File,
    filename?: string,
  ): Promise<{ url: string; key: string }> {
    console.log("Work")

    if (!file ) {
      throw new InternalServerErrorException('File or file buffer is missing');
    }

    const data = await new Promise<UploadApiResponse | UploadApiErrorResponse | undefined>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          public_id: filename,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      ).end(file.buffer)
    })
    if (data) return { url: data.secure_url, key: data.public_id }
    throw new InternalServerErrorException();
  }
  async getUrl(key: string): Promise<{ url: string }> {
    return { url: 'abc.com' };
  }
  async remove(key: string): Promise<{ status: boolean }> {
    return { status: true };
  }
}
