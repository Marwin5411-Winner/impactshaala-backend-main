import AWS from "aws-sdk";
import fs from "fs";
import mime from "mime-types"; // Ensure this is installed with npm install mime-types
import dotenv from "dotenv";
dotenv.config();

// Environment variables for AWS configuration
const ID = process.env.S3_ACCESS_KEY_ID;
const SECRET = process.env.S3_SECRET_ACCESSKEY;
const BUCKET_NAME = process.env.S3_BUCKETNAME;
const S3_REGION = process.env.S3_REGION;
const S3_URL_REPOSITORY = process.env.S3_URL_REPOSITORY; // Added for consistency

if (!ID || !SECRET || !BUCKET_NAME || !S3_REGION) {
  throw new Error("Missing required environment variables for S3 configuration.");
}

// Initialize AWS S3 client
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  region: S3_REGION,
});

// Function to upload base64 image data
async function s3_upload(base64, nameFile, folder) {
  if (!base64) {
    return "";
  }
  
  const base64Data = Buffer.from(
    base64.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ""),
    "base64"
  );
  const type = base64.split(";")[0].split("/")[1];
  const key = `${folder}/${nameFile}.${type}`;
  const data = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: base64Data,
    ContentEncoding: "base64",
    ContentType: mime.lookup(`${nameFile}.${type}`) || "application/octet-stream",
    ACL: "public-read",
  };

  try {
    await s3.putObject(data).promise();
    console.log("Successfully uploaded the image!");
    return `${S3_URL_REPOSITORY}/${key}`;
  } catch (error) {
    console.error(`Error while uploading image: ${error.message}`);
    throw error;
  }
}

// Function to upload file buffer
async function s3_buffer_upload(fileContent, path, filename) {
  const key = `${path}/${filename}`;
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileContent,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data.Location);
    return data.Location;
  } catch (err) {
    console.error("Error uploading file:", err.message);
    throw err;
  }
}

// Function to detect image extension based on file signature
function imageExtension(buffer) {
  const fileSignature = buffer.toString("hex", 0, 4);
  const signatureToExtension = {
    "89504e47": "png",
    "ffd8ffe0": "jpg",
    "ffd8ffe1": "jpg",
    "ffd8ffe2": "jpg",
    "ffd8ffe3": "jpg",
    "47494638": "gif",
    "52494646": "webp",
  };
  return signatureToExtension[fileSignature] || null;
}

// Function to delete a file from S3
async function deleteFileFromS3(key) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log("File deleted successfully.");
    return true;
  } catch (err) {
    console.error("Error deleting file:", err.message);
    throw err;
  }
}

export { s3_upload, s3_buffer_upload, imageExtension, deleteFileFromS3 };
