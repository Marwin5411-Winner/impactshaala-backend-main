import Internship from "../../models/internship/internship.js";
import {checkNumberFields} from '../../utils/check-input-fields.js';
import checkAlphabetFields from "../../utils/check-alphabet-fields.js";
import User from "../../models/user/user.js";
import {s3_buffer_upload,imageExtension} from "../../utils/s3_bucket.js";
import checkUserPermission from "../../utils/check-user-permission.js";


async function createPosting(req, res, next) {
     // userId is received from isUserAuthenticated middleware
     const userId = req.user.id;
    try{

        let checkPermission =await checkUserPermission(userId,res,next);

        if(checkPermission!==true){
            return res.status(401).json({success:false,message:"You do not have permission to post a job or internship"});
        }

        if(checkPermission!==true && checkPermission!==false){
            return res.status(500).json({success:false,message:"Something went wrong"});
        }

        const user = await User.findOne({authId: userId});

        if(!user){
            return res.status(404).json({success: false,message: "User not found"});
        }

        console.log(`Jobs : ${user._id}`);

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
            lastDateToApply,
            numberOfOpenings
            } = req.body;

        if(!jobPostingType||!jobTitle|| !workplaceType ||
        (!jobLocation && workplaceType.toLowerCase() != "remote")|| !communicationType || !jobType || (!email && !phone)){
            return res.status(400).json({success: false,message:"Please provide required fields"});
        }

        const checkTitleFormat = checkAlphabetFields(jobTitle);

        if(checkTitleFormat!==true){
            return res.status(400).json({success: false,message:"Please enter alphabetic characters only"});
        }

        if(jobLocation){
            const checkJobLocationFormat =  checkAlphabetFields(jobLocation);
    
            if(checkJobLocationFormat!==true){
                return res.status(400).json({success: false,message:"Please enter alphabetic characters only"});
            }
        }


        if(phone!==''){
            
            if(phone.length > 10 || phone.length <10){
                return res.status(400).json({success:false,message:"Please provide a valid 10 digit phone number"});
            }
    
            var checkPhone = await checkNumberFields(phone);

            if(checkPhone!==true){
                return res.status(400).json({success:false,message:"Invalid phone Number format"});
            }
        }

        
        const jobPost = await Internship.create({
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
            lastDateToApply,
            numberOfOpenings,
        });

        // .docx .pdf

        if(attachment){
            console.log(`Check 1`);

            // this line are not being used
            attachment.replace(
                /^data:(image\/\w+|application\/pdf\/docx);base64,/,
                ""
            );
            //
            const buffer = Buffer.from(attachment, "base64");
            const extension = imageExtension(
                buffer
            );
          let uploaded_doc = await s3_buffer_upload(
            buffer,
            `impactshaala`,
            `${userId}.${attachmentType}`
          );
          console.log(`Check 2`);

          console.log(`Extension : ${extension}`);

          jobPost.attachment = uploaded_doc;
          await jobPost.save();
        }

        return res.status(200).json({success:true,message:"Your job application posted successfully"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


export default createPosting;