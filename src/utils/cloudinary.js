import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("No file path provided for Cloudinary upload");
            return null;
        }

        if (!fs.existsSync(localFilePath)) {
            console.error("File does not exist:", localFilePath);
            return null;
        }

        console.log("Uploading to Cloudinary:", localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("Upload successful:", response.secure_url);
        fs.unlinkSync(localFilePath); // Delete file after success
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Delete only if file exists
        }
        return null;
    }
};

export { uploadOnCloudinary };