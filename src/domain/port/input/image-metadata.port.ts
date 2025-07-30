export interface IImageMetadataPort {
  createMetadata();
  createVersion(id: string, publicUrl: string);
  updateVersionActive(id: string, versionIndex: number);
}
