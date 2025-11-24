import cloudinary from "../config/cloudinary.js"
const uploadSingleFile = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    ).end(file.buffer); // send the buffer to Cloudinary
  });
};

export default uploadSingleFile;
