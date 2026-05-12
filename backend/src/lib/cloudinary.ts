import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '@/utils/ApiError';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Upload single image to Cloudinary
export const uploadSingleImage = async (file: string | Buffer): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
      folder: 'chalate-system',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    return result.secure_url;
  } catch (error) {
    throw new ApiError(500, 'Failed to upload image to Cloudinary');
  }
};

// Upload multiple images to Cloudinary
export const uploadMultipleImages = async (files: (string | Buffer)[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => 
      cloudinary.uploader.upload(file, {
        resource_type: 'auto',
        folder: 'chalate-system',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' }
        ]
      })
    );

    const results = await Promise.all(uploadPromises);
    return results.map(result => result.secure_url);
  } catch (error) {
    throw new ApiError(500, 'Failed to upload images to Cloudinary');
  }
};

// Delete image from Cloudinary
export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new ApiError(500, 'Failed to delete image from Cloudinary');
  }
};

// Delete multiple images from Cloudinary
export const deleteMultipleImages = async (publicIds: string[]): Promise<void> => {
  try {
    await cloudinary.api.delete_resources(publicIds);
  } catch (error) {
    throw new ApiError(500, 'Failed to delete images from Cloudinary');
  }
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (url: string): string => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const publicId = filename.split('.')[0];
  return `chalate-system/${publicId}`;
};
