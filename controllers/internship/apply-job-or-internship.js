import Applicants from "../../models/applicants/applicants.js";
import checkUserPermission from "../../utils/check-user-permission.js";
import User from "../../models/user/user.js";
import { checkNumberFields} from "../../utils/check-input-fields.js";
import {s3_buffer_upload,imageExtension} from "../../utils/s3_bucket.js";
import checkAlphabetFields from "../../utils/check-alphabet-fields.js";

async function applyToJobOrInternship(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const user = await User.findOne({authId: userId});

        if(!user){
            return res.status(404).json({success: false,message: "User not found"});
        }

        let checkPermission =await checkUserPermission(userId,res,next);

        if(checkPermission!==false){
            return res.status(401).json({success:false,message:"You do not have permission to apply a job or internship"});
        }

        if(checkPermission!==true && checkPermission!==false){
            return res.status(500).json({success:false,message:"Something went wrong"});
        }

        let {
            jobPostingType,
            jobTitle,
            workplaceType,
            jobLocation,
            jobType,
            communicationType,
            phone,
            email,
            attachment,
            attachmentType,
            description
            } = req.body;

        if(!jobPostingType||!jobTitle||!workplaceType|| (!jobLocation && workplaceType.toLowerCase() != "remote") ||
            !communicationType || !jobType||(!email && !phone) || !description || !attachment){
            return res.status(400).json({success: false,message:"Please provide required fields"});
        }

        if(phone!==''){
            var checkPhone = await checkNumberFields(phone);

            if(checkPhone!==true){
                return res.status(400).json({success:false,message:"Invalid phone Number format"});
            }
        }

        if(jobLocation){
            const checkJobLocationFormat =  checkAlphabetFields(jobLocation);
    
            if(checkJobLocationFormat!==true){
                return res.status(400).json({success: false,message:"Please enter alphabetic characters only"});
            }
        }


        const applyJob = await Applicants({
            userId: user._id,
            jobPostingType :jobPostingType,
            jobTitle :jobTitle,
            workplaceType :workplaceType,
            jobLocation :jobLocation,
            jobType :jobType,
            communicationType :communicationType,
            phone :phone,
            email:email,
            attachmentType:attachmentType,
            description:description,
        });

        
        // .docx .pdf

        if(attachment===''){
            return res.status(400).json({success:false,message:"Kindly ensure the submission of requisite documents for the job or internship application."})
        }


            // this line are not being used
            attachment = attachment.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/,"");
            //
            const buffer = Buffer.from(attachment, "base64");
          let uploaded_doc = await s3_buffer_upload(
            buffer,
            `impactshaala`,
            `${userId}.${attachmentType}`
          );
          console.log(`Check 2`);


          applyJob.attachment = uploaded_doc;
          await applyJob.save();


        return res.status(200).json({success:true,message:"Your job application sent successfully"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


export default applyToJobOrInternship;