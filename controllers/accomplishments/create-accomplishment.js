import Accomplishments from "../../models/accomplishments/accomplishments.js";
import User from "../../models/user/user.js";
import { s3_buffer_upload } from "../../utils/s3_bucket.js";
import getBase64Size from "../../utils/check-image-size.js";

const createAccomplishment = async (req, res, next) => {
  const authId = req.user.id;
  try {
    const user = await User.findOne({ authId }).lean();

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const {
      projectTitle,
      collaborations,
      startDate,
      endDate,
      primaryObjective,
      keyDeliverables,
      approach,
      activities,
      challenges,
      educationalImpact,
      innovativeApproach,
      impactLevel,
      lastingImpact,
      projectAdequacy,
      achievements,
      testimonials,
      images,
      videos,
      documents,
    } = req.body;

    console.log(req.body);

    if (
      !projectTitle ||
      !collaborations ||
      !startDate ||
      !endDate ||
      !primaryObjective ||
      !keyDeliverables ||
      !approach ||
      !educationalImpact
    )
      return res.status(400).json({
        success: false,
        message: "Please Enter All The Required Fields",
      });

    const accomplishment = await Accomplishments({
      userId: user._id,
      projectTitle,
      collaborations,
      startDate,
      endDate,
      primaryObjective,
      keyDeliverables,
      approach,
      activities,
      challenges,
      educationalImpact,
      innovativeApproach,
      impactLevel,
      lastingImpact,
      projectAdequacy,
      achievements,
      testimonials,
      approvalStatus: "APPLIED",
    });

    if (images && !checkIfAllowedFile(images))
      return res.status(400).json({
        success: false,
        message: "Only .png, .jpg, .jpeg and .webp images are allowed",
      });
    if (images)
      accomplishment.images = await uploadFiles(
        accomplishment,
        images.filter((image) => !!image),
        "images",
        res
      );
    if (videos && !checkIfAllowedFile(videos))
      return res
        .status(400)
        .json({ success: false, message: "Only .mp4 videos are allowed" });
    if (videos)
      accomplishment.videos = await uploadFiles(
        accomplishment,
        videos.filter((video) => !!video),
        "videos",
        res
      );
    if (documents && !checkIfAllowedFile(documents))
      return res
        .status(400)
        .json({ success: false, message: "Only .pdf documents are allowed" });
    if (documents)
      accomplishment.documents = await uploadFiles(
        accomplishment,
        documents.filter((doc) => !!doc),
        "documents",
        res
      );

    const savedAccomplishment = await accomplishment.save();

    if (!savedAccomplishment)
      return res.status(500).json({
        success: false,
        message: "There was some error while saving the accomplishment",
      });



	  
  

    return res.json({
      success: true,
      message: "Successfully Submitted An Accomplishment Request",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const checkIfAllowedFile = (files) => {
  const extensions = files.map((file) => getFileExtension(file));
  for (let i = 0; i < extensions.length; ++i) {
    if (!["png", "jpg", "jpeg", "webp", "pdf", "mp4"].includes(extensions[i]))
      return false;
  }
  return true;
};

const uploadFiles = async (accomplishment, files, key, res) => {
  const savedFiles = [];

  // Filter out null, undefined, or empty objects from files
  files = files.filter(
    (file) => file && (typeof file !== "object" || Object.keys(file).length > 0)
  );

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    let file = files[i];

    const checkSize = getBase64Size(file);
    if (key === "images" && checkSize > 512)
      return res
        .status(400)
        .json({ success: false, message: "Image exceeds 500 KB image limit." });
    if (key === "videos" && checkSize > 1024 * 2)
      return res
        .status(400)
        .json({ success: false, message: "Video exceeds 2 MB video limit." });
    if (key === "documents" && checkSize > 1024 * 2)
      return res.status(400).json({
        success: false,
        message: "Document exceeds 2 MB video limit.",
      });

    if (typeof file === "string" && !file.startsWith("https://")) {
      file = file.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, "");
      const buffer = Buffer.from(file, "base64");
      const extension = getFileExtension(file);
      const uploadFile = await s3_buffer_upload(
        buffer,
        `impactshaala`,
        `${accomplishment._id.toString()}_${Date.now()}.${extension}`
      );
      savedFiles.push(uploadFile);
    } else {
      savedFiles.push(file);
    }
  }

  return savedFiles;
};

const getFileExtension = (file) => {

  const metaData = file.split(";")[0];
  return metaData.split("/")[1];
};

export default createAccomplishment;
