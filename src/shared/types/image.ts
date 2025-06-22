export interface ImageUploadResponse {
  message: string;
  imageUploadDto: UploadedImage[];
}

export interface UploadedImage {
  id: number;
  imageUrl: string;
}
