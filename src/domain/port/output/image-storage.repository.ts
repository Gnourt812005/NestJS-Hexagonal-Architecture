export interface IImageStorage {
  upload(file: Express.Multer.File, filename?: string): Promise<{ url: string; key: string }>;
  getUrl(key: string): Promise<{url: string}>;
  remove(key: string): Promise<{status: boolean}>;
}