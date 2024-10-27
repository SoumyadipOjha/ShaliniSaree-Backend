const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "SareeCom",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Utility function to upload image to Cloudinary
async function imageUploadUtil(file) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(new Error(`Upload failed: ${error.message}`));
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(file.buffer); // Pipe the buffer directly to Cloudinary
  });
}

// Exporting the upload middleware and utility function
module.exports = { upload, imageUploadUtil };
