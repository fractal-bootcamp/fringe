import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
dotenv.config();

console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('Region:', process.env.AWS_REGION);
console.log('Bucket Name:', process.env.S3_BUCKET_NAME);
// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

/**
 * Uploads a file to S3
 * @param fileBuffer - The file buffer to upload
 * @param fileName - The name to give the file in S3
 * @param contentType - The MIME type of the file
 * @returns Promise with the S3 upload result
 */
export async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  return await s3Client.send(command);
}

/**
 * Generates a signed URL for reading a file from S3
 * @param fileName - The name of the file in S3
 * @param expiresIn - Number of seconds until the URL expires
 * @returns Promise with the signed URL
 */
export async function getSignedReadUrl(
  fileName: string,
  expiresIn: number = 3600
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