import { ImageMetadata } from '../../models/image-metadata.model';

export interface IImageMetadataDb {
  createMetadata(): Promise<{ id: string }>;
  getMetadata(id: string): Promise<any>; //Promise<{metadata: ImageMetadata}>
  deleteMetadata(id: string): Promise<any>;

  createNewVersion(id: string, url: string): Promise<any>;
  getActiveVersionIndex(id: string): Promise<{ version: number }>;
  deleteVersion(id: string): Promise<any>;
  updateVersion(id: string, versionIndex: number): Promise<any>;
}
