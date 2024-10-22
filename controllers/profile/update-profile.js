import User from '../../models/user/user.js';
import {s3_buffer_upload,deleteFileFromS3,imageExtension} from "../../utils/s3_bucket.js";
import {checkEmail,checkNumberFields,checkPinCode} from '../../utils/check-input-fields.js'

async function updateProfile(req, res, next) {
    const userId = req.user.id;
    try {

        const showUserProfile = await User.findOne({authId: userId});

        if(showUserProfile===null){
            return res.status(404).json({message: 'User not found'});
        }

        let {
            name,
            collabKeywords,
            tagline,
            description,
            website,
            countryCode,
            contactNo,
            comEmail,
            address,
            city,
            district,
            state,
            country,
            pinCode,
            profilePic,
            foundingYear,
            industry,
            organizationSize,
            workExperience,
            highestEducation,
            educationalInstitution,
            location,
            course,
        } = req.body;

        console.log(req.body);


        if(contactNo){
            console.log(`passed`);
            checkNumberFields(contactNo,res);
            if(contactNo.length>10 || contactNo.length<10){
                return res.status(400).json({ message: "Contact number must be of 10 digits"});
            }
        }

        if(pinCode){
            checkPinCode(pinCode,res);
            if(pinCode.length>6||pinCode.length<6){
                return res.status(400).json({ message: "Pin Code must be of 6 digits"});
            }
        }

        if(comEmail){
            const isEmailValid = checkEmail(comEmail.trim());

            if(isEmailValid!==true) {
                return res.status(400).json({success: false,message: 'Invalid email format'});
            }
        }

        if(profilePic){
            if(!profilePic.startsWith("https://")){
                if (showUserProfile.profilePic) {
                    await deleteFileFromS3(showUserProfile.profilePic);
                  }
                profilePic = profilePic.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          const buffer = Buffer.from(profilePic, "base64");
          const extension = imageExtension(
            buffer
          );
          let image = await s3_buffer_upload(
            buffer,
            `impactshaala`,
            `${userId}.${extension}`
          );
          profilePic = image;}}
          else{
            if (showUserProfile.profilePic) {
                await deleteFileFromS3(showUserProfile.profilePic);
                profilePic=null
              }
          }


        const profile = await User.findByIdAndUpdate(
            showUserProfile._id,
            {
                name : name,
                collabKeywords:collabKeywords,
                tagline : tagline,
                description : description,
                website : website,
                countryCode : countryCode,
                contactNo : contactNo,
                comEmail : comEmail,
                address : address,
                city : city,
                district : district,
                state : state,
                country : country,
                pinCode : pinCode,
                profilePic:profilePic,
                foundingYear,
                location,
                industry,
                organizationSize,
                workExperience,
                highestEducation,
                educationalInstitution,
                course,
            },{new:true}
        );

        return res.status(200).json({
            success:true,
            message: "User updated successfully",
            data: profile
        });

    } catch (err) {
        return res.status(500).json({
        success:false,
        message: `Error while creating user : ${err.message}`
    });
    }
}

export default updateProfile;
