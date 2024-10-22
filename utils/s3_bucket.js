import AWS from 'aws-sdk';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Enter copied or downloaded access ID and secret key here
const ID = process.env.S3_ACCESS_KEY_ID;
const SECRET = process.env.S3_SECRET_ACCESSKEY;

// The name of the bucket that you have created
const BUCKET_NAME = process.env.S3_BUCKETNAME;;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});


const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    // Set your region here
    LocationConstraint: process.env.S3_REGION,
  },
};


async function s3_upload(base64,nameFile,folder){
    if(base64===''){
        return '';
    }
    const base64Data =  Buffer.from(base64.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');
    const type = base64.split(';')[0].split('/')[1];
    const data = {
       Bucket:bucketName,
       Key: `${folder}/${nameFile}.${type}`,
       Body: base64Data,
       ContentEncoding: 'base64',
       ContentType: mime.lookup(`${nameFile}.${type}`) || 'application/octet-stream',
       ACL:'public-read'
     };
    try {
          s3.putObject(data ,function(err, data){
          if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
          } else {
            console.log('successfully uploaded the image!');
          }
       }).promise();
       return `${config.S3_URL_REPOSITORY}/${data.Key}`;

    } catch (error) {
      console.log(`Error while uploading image: ${error.message}`);
    }
 }



 async function s3_buffer_upload(fileContent, path, filename) {
  // Read content from the file
  const fileName = filename;
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: path + "/" + fileName, // File name you want to save as in S3
    Body: fileContent,
  };
  //console.log(params)
  // Uploading files to the bucket
  try {
    var data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    throw err;
  }
}


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
  const extension = signatureToExtension[fileSignature];
  return extension || null;
}

async function deleteFileFromS3(key) {
  const parts = key.split("/");
  const keyName =
    parts[parts.length - 2] +
    "/" +
    parts[parts.length - 1];
  const params = {
    Bucket: BUCKET_NAME,
    Key: keyName,
  };
  await s3.deleteObject(params, function (err, data) {
    if (err) {
      console.error("Error deleting file:", err);
      throw err;
    } else {
      console.log("File deleted successfully.");
      return true;
    }
  });
}

 export {s3_upload,s3_buffer_upload,imageExtension,deleteFileFromS3};

