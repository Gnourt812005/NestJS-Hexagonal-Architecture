import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { randomUUID } from 'node:crypto';
import { ImageMetadataService } from 'src/domain/port/input/image-metadata.service';
import { ImageUploadService } from 'src/domain/port/input/image-upload.service';
import { VersionCreate } from './dto/version.dto';

@Controller()
export class RestfulImageUploadController {
  constructor(
    private imageMetadataService: ImageMetadataService,
    private imageUploadService: ImageUploadService,
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
      const id = await this.imageMetadataService.createMetadata();
      // const id = randomUUID()
      const publicUrl = await this.imageUploadService.upload(file, id);
      await this.imageMetadataService.createVersion(id, publicUrl);

      return { id: id, publicUrl: publicUrl };
    } catch (error) {
      throw new BadRequestException(`Upload failed: ${error}`);
    }
  }

  @Post("/version")
  async createNewVersion(@Body() versionCreate: VersionCreate ) {
    const res = await this.imageMetadataService.createVersion(
      versionCreate.id,
      versionCreate.publicUrl
    )
    return res
  }
}
