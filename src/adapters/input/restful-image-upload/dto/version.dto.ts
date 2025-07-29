import { IsString } from "class-validator";

export class VersionCreate {
  @IsString()
  id: string

  @IsString()
  publicUrl: string
}