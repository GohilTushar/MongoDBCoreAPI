import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from 'path'
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function checkFileType(file) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file).toLowerCase());
  if(extname)return true;
  return false;
}

const uploadOnCloudinary = async (localFilePath,fileName) => {

  try {
    const file=checkFileType(fileName)
    if (!file){
      fs.unlinkSync(localFilePath);
      return null;
    } 
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "CoreAPI",
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary ", response.secure_url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); 
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    console.log("File deleted from Cloudinary", response);
    return response;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
};

export { uploadOnCloudinary , deleteFromCloudinary };
