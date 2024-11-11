import { uploadToS3, getSignedReadUrl, deleteFromS3 } from '../utils/s3';
import * as fs from 'fs';
import * as path from 'path';

async function deleteS3TestImage(fileName: string, downloadPath: string) {
  console.log('\n5. Deleting image...');
  await deleteFromS3(fileName);
  console.log('✅ Image deleted successfully');

  // Clean up downloaded file
  fs.unlinkSync(downloadPath);
  console.log('✅ Cleaned up local test files');
}

async function testS3ImageOperations() {
  try {
    // Test with a local image file
    const imagePath = path.join(__dirname, 'test-image.jpg'); 
    if (!fs.existsSync(imagePath)) {
      throw new Error('Test image not found');
    }
    const imageBuffer = fs.readFileSync(imagePath);
    const fileName = `test-image-${Date.now()}.jpg`;

    console.log('1. Testing image upload...');
    await uploadToS3(imageBuffer, fileName, 'image/jpeg');
    console.log('✅ Image uploaded successfully');

    console.log('\n2. Getting signed URL...');
    const signedUrl = await getSignedReadUrl(fileName, 3600); // 1 hour expiration
    console.log('✅ Signed URL generated:', signedUrl);
    
    // Test the URL is accessible
    console.log('\n3. Verifying URL accessibility...');
    const response = await fetch(signedUrl);
    if (response.ok) {
      console.log('✅ URL is accessible');
      console.log('Content-Type:', response.headers.get('content-type'));
      console.log('Content-Length:', response.headers.get('content-length'));
    }
    else {
      console.error('❌ URL is not accessible');
      throw new Error('URL is not accessible');
    }

    console.log('\n4. Downloading image to verify...');
    const downloadPath = path.join(__dirname, 'downloaded-test-image.jpg');
    const downloadedContent = await response.arrayBuffer();
    fs.writeFileSync(downloadPath, Buffer.from(downloadedContent));
    console.log('✅ Image downloaded successfully');

    await deleteS3TestImage(fileName, downloadPath);

  } catch (error) {
    console.error('❌ Error during S3 operations:', error);
    throw error;
  }
}

// Run the test
console.log('Starting S3 image operations test...\n');
testS3ImageOperations().then(() => {
  console.log('\nTest completed');
}).catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
}); 