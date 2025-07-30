import { IsString } from 'class-validator';

export class VersionCreate {
  @IsString()
  idImage: string;

  @IsString()
  publicUrl: string;
}
