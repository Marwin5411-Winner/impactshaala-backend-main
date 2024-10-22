import Internship from "../../models/internship/internship.js";
import checkUserPermission from "../../utils/check-user-permission.js";
import User from "../../models/user/user.js";
import {s3_buffer_upload,deleteFileFromS3,imageExtension} from "../../utils/s3_bucket.js";

async function updateMyJobOrInternship(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;

    try{
        let checkPermission = await checkUserPermission(userId,res,next);

        const jobId = req.query.jobId;


        if(checkPermission!==true){
            return res.status(401).json({success:false,message:"You do not have permission to post a job or internship"});
        }

        if(checkPermission!==true && checkPermission!==false){
            return res.status(500).json({success:false,message:"Something went wrong"});
        }

        const userProfile = await User.findOne({authId:userId});
 

        if(!userProfile){
            return res.status(404).json({success:false,message:"User not found"})
        }

        let job = await Internship.findById(jobId);

        if(!job){
            return res.status(404).json({success:false,message:"Couldn't find the job your looking for"})
        }

        let {
            jobPostingType,
            jobTitle,
            workplaceType,
            jobLocation,
            jobType,
            communicationType,
            phone,
            attachment,
            attachmentType,
            lastDateToApply,
            numberOfOpenings,
        } = req.body;

        // first compare whether the same person as posted the job or not.
        if(job.userId.toString()===userProfile._id.toString()){

            if(attachment){
                if(!attachment.startsWith("https://")){
                    if (job.attachment) {
                        await deleteFileFromS3(job.attachment);
                      }
                    profilePic = profilePic.replace(
                        /^data:(image\/\w+|application\/pdf\/docx);base64,/,
                        ""
                    );
                }
                const buffer = Buffer.from(attachment, "base64");
                const extension = imageExtension(
                    buffer
                );
              let uploaded_doc = await s3_buffer_upload(
                buffer,
                `impactshaala`,
                `${userId}.${attachmentType}`
              );
              attachment=uploaded_doc;
            }else{
                if (job.attachment) {
                    await deleteFileFromS3(job.attachment);
                    attachment=null
                }
            }

            let update = {
                jobPostingType:jobPostingType,
                jobTitle:jobTitle,
                workplaceType:workplaceType,
                jobLocation:jobLocation,
                jobType:jobType,
                communicationType:communicationType,
                phone:phone,
                attachment:attachment,
                numberOfOpenings,
                lastDateToApply,
            }

            job = await Internship.findByIdAndUpdate(jobId,update,{new:true});

            return res.status(200).json({success:true,message:"Job Update successfully",data:job});
        }else{
            return res.status(401).json({success:false,message:"You don't have an access to update this job"});
        }

    }catch(err){
        return res.status(500).json({success:false, message:err.message});
    }
}


export default updateMyJobOrInternship