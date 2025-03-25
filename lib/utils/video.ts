import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export interface CloudinaryUploadResult {
  url: string;
  cloudinaryId: string;
  format: string;
  size: number;
}

export async function uploadToCloudinary(videoUrl: string): Promise<CloudinaryUploadResult> {
  try {
    const result = await cloudinary.uploader.upload(videoUrl, {
      resource_type: 'video',
      folder: 'dubbby',
    });

    return {
      url: result.secure_url,
      cloudinaryId: result.public_id,
      format: result.format,
      size: result.bytes,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload video to Cloudinary');
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
} 