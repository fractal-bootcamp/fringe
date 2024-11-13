import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
dotenv.config();

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

/**
 * Uploads a file to S3
 * @param fileBuffer - The file buffer to upload
 * @param fileName - The name to give the file in S3
 * @returns Promise with the S3 upload result
 */
export async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string,
) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType:  "image/jpeg",
  });

  await s3Client.send(command);
  return fileName;
}

/**
 * Generates a signed URL for reading a file from S3
 * @param fileName - The name of the file in S3
 * @param expiresIn - Number of seconds until the URL expires (max 7 days)
 * @returns Promise with the signed URL
 */
export async function getSignedReadUrl(
  fileName: string,
  expiresIn: number = 604800  // 7 days in seconds
) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Deletes a file from S3
 * @param fileName - The name of the file to delete from S3
 * @returns Promise with the deletion result
 */
export async function deleteFromS3(fileName: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  });

  return await s3Client.send(command);
}