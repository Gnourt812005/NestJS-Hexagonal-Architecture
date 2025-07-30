export interface IImageUploadPort {
  upload(file: Express.Multer.File, fileName: string): Promise<string>;
  getUrl(key: string): Promise<string>;
  remove(key: string): Promise<boolean>;
}
