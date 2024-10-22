import User from "../../models/user/user.js";
import { s3_buffer_upload } from "../../utils/s3_bucket.js";
import getBase64Size from "../../utils/check-image-size.js";

const createAccomplishment = async (req, res, next) => {
  const authId = req.user._id; // Assuming user is authenticated and their ID is available in req.user._id
  const { title, description, files } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    const user = await User.findOne({ authId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Process files (upload them to S3 and get their URLs)
    let uploadedFiles = [];
    if (files) {
      if (!checkIfAllowedFile(files, ["png", "jpg", "jpeg", "webp", "mp4", "pdf"])) {
        return res.status(400).json({ success: false, message: "Invalid file format. Only .png, .jpg, .jpeg, .webp, .mp4, and .pdf files are allowed." });
      }

      uploadedFiles = await uploadFiles(files, res);
    }

    // Add accomplishment to the user's accomplishments array
    const newAccomplishment = {
      title,
      description,
      files: uploadedFiles,
      approvalStatus: "APPLIED",
    };

    user.accomplishments.push(newAccomplishment); // Add the new accomplishment
    await user.save(); // Save the updated user document

    //Notification
	  await createNotification(user._id, "You have submit your Archivement, You Archivement is under Review", "OTHER");

	  await sendNotificationEmail({
		email: req.user.email,
		userName: user.name,
		notificationType: "New Post",
		notificationMessage: "You have submit your Archivement, You Archivement is under Review",
		actionLink: "https://impactshaala.com/",
	  });

    return res.status(200).json({ success: true, message: "Accomplishment added successfully", data: newAccomplishment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Helper function to check if the file extensions are allowed
const checkIfAllowedFile = (files, allowedExtensions) => {
  const extensions = files.map((file) => getFileExtension(file));
  for (let i = 0; i < extensions.length; i++) {
    if (!allowedExtensions.includes(extensions[i])) return false;
  }
  return true;
};

// Upload files to S3 and return the uploaded file URLs
const uploadFiles = async (files, res) => {
  const savedFiles = [];

  // Filter out null, undefined, or empty objects from files
  files = files.filter(
    (file) => file && (typeof file !== "object" || Object.keys(file).length > 0)
  );

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    let file = files[i];

    const checkSize = getBase64Size(file);
    if (checkSize > 1024 * 2) {
      return res.status(400).json({
        success: false,
        message: "File exceeds 2 MB limit.",
      });
    }

    if (typeof file === "string" && !file.startsWith("https://")) {
      // Convert base64 data to buffer and upload to S3
      file = file.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, "");
      const buffer = Buffer.from(file, "base64");
      const extension = getFileExtension(file);
      const uploadFile = await s3_buffer_upload(
        buffer,
        `impactshaala`,
        `${Date.now()}.${extension}`
      );
      savedFiles.push(uploadFile);
    } else {
      savedFiles.push(file); // If it's already a URL
    }
  }

  return savedFiles;
};

// Extract file extension from base64 data or URL
const getFileExtension = (file) => {
  const metaData = file.split(";")[0];
  return metaData.split("/")[1];
};

export default createAccomplishment;
