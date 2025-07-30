import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { VersionCreate } from './dto/version.dto';
import { IImageMetadataPort } from 'src/domain/port/input/image-metadata.port';
import { IImageUploadPort } from 'src/domain/port/input/image-upload.port';

@Controller()
export class RestfulImageUploadController {
  constructor(
    @Inject("IImageMetadataPort")
    private imageMetadataPort: IImageMetadataPort,
    @Inject("IImageUploadPort")
    private imageUploadPort: IImageUploadPort,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const id = await this.imageMetadataPort.createMetadata();
      const publicUrl = await this.imageUploadPort.upload(file, id);
      await this.imageMetadataPort.createVersion(id, publicUrl);

      return { id: id, publicUrl: publicUrl };
    } catch (error) {
      throw new BadRequestException(`Upload failed: ${error}`);
    }
  }

  @Post("/version")
  async createNewVersion(@Body() versionCreate: VersionCreate ) {
    const res = await this.imageMetadataPort.createVersion(
      versionCreate.id,
      versionCreate.publicUrl
    )
    return res
  }
}
