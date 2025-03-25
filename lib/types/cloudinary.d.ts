declare module 'cloudinary' {
  interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  }

  interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    format: string;
    bytes: number;
  }

  interface CloudinaryDestroyResult {
    result: 'ok' | 'not found';
  }

  interface CloudinaryUploader {
    upload(
      file: string,
      options: {
        resource_type: 'video' | 'image' | 'raw' | 'auto';
        folder?: string;
      }
    ): Promise<CloudinaryUploadResult>;
    destroy(
      publicId: string,
      options: {
        resource_type: 'video' | 'image' | 'raw' | 'auto';
      }
    ): Promise<CloudinaryDestroyResult>;
  }

  interface CloudinaryV2 {
    config(config: CloudinaryConfig): void;
    uploader: CloudinaryUploader;
  }

  export const v2: CloudinaryV2;
} 