import { BadRequestException, Controller, Get, Post, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ImageMetadataService } from 'src/domain/port/input/image-metadata.service';
import { ImageUploadService } from 'src/domain/port/input/image-upload.service';

@Controller()
export class RestfulImageUploadController {
  constructor(
    private imageMetadataService: ImageMetadataService,
    private imageUploadService: ImageUploadService
  ) 
  {}
 
  @Post("/upload")
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
    if (file!) {
      throw new BadRequestException("No file uploaded");
    }

    try {
      const id = await this.imageMetadataService.createMetadata();
      const publicUrl = await this.imageUploadService.upload(file, id);
      await this.imageMetadataService.createVersion(id, publicUrl);
      
      return {id: id, publicUrl: publicUrl}
    } catch (error) {
      throw new BadRequestException(`Upload failed: ${error}`)
    }
  }
}
