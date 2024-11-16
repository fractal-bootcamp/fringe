import axios from 'axios';
import { uploadToS3 } from '../utils/s3';

// List of real companies for logos
const companies = [
  'apple.com',
  'microsoft.com',
  'amazon.com',
  'google.com',
  'meta.com',
  'netflix.com',
  'tesla.com',
  'nvidia.com',
  'adobe.com',
  'salesforce.com'
];


// Professional headshot collection from UI Faces
const professionalHeadshots = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
  'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50',
  'https://images.unsplash.com/photo-1572561300743-2dd367ed0c9a',
  'https://images.unsplash.com/photo-1537511446984-935f663eb1f4',
  'https://images.unsplash.com/photo-1618077360395-f3068be8e001'
];

async function downloadImage(url: string): Promise<Buffer> {
  const response = await axios.get(url, { 
    responseType: 'arraybuffer',
    headers: {
      // Some sites block requests without user agents
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });
  return Buffer.from(response.data);
}

async function uploadProfilePhotos() {
    // Upload people photos
    console.log('\nUploading people profile photos:');
    for (let i = 0; i < professionalHeadshots.length; i++) {
      const imageBuffer = await downloadImage(`${professionalHeadshots[i]}?w=800&q=80`);
      const fileName = `applicant-${i + 1}.jpg`;
      await uploadToS3(imageBuffer, fileName);
      console.log(`✓ Uploaded: ${fileName}`);
      
      // Add a small delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Upload company logos
    console.log('\nUploading company logos:');
    for (let i = 0; i < companies.length; i++) {
      // Clearbit's logo API - returns company logos in a clean format
      const imageBuffer = await downloadImage(`https://logo.clearbit.com/${companies[i]}?size=800`);
      const fileName = `company-${i + 1}.jpg`;
      await uploadToS3(imageBuffer, fileName);
      console.log(`✓ Uploaded: ${fileName} (${companies[i]})`);
      
      // Add a small delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }


}

// Execute the upload
uploadProfilePhotos();
