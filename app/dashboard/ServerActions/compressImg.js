import { v2 as cloudinary } from 'cloudinary';

// Configure your Cloudinary settings
cloudinary.config({
  cloud_name: 'ds7apzwdf',
  api_key: '215635848718482',
  api_secret: '2lrqOKaE_dTmwlfDBS9R48TyfCw'
});

const publicId = 'cld-sample-5';
const width = 500;
const height = 500;
const crop = 'fill'; // Adjust based on your needs

const imageUrl = cloudinary.url(publicId, {
  width,
  height,
  crop,
  format: 'jpg' // or any other format you need
});

console.log(imageUrl);
