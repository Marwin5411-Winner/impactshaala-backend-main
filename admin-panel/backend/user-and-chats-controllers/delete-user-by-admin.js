import Authentication from "../../../models/auth/authenication.js";
import mongoose from "mongoose";
import User from "../../../models/user/user.js";
import {usersSchemaEnums} from '../../../consts/userenums.js';
import Applicants from "../../../models/applicants/applicants.js";
import Internship from "../../../models/internship/internship.js";
import {deleteFileFromS3} from "../../../utils/s3_bucket.js";

const userEnums = usersSchemaEnums.status;

async function deleteUserByAdmin(req,res){
    try{
        const {uid} = req.query;
        const userId = new mongoose.Types.ObjectId(uid);
    
        let userProfile = await User.findOneAndDelete({authId:userId});
        // let applicants = await Applicants.findOne({userId:userProfile._id});
        // let internship = await Internship.findOne({userId:userProfile._id});

        // console.log(`Applicants : ${applicants.length}`);

        // if(applicants){
        //     if(applicants.attachment){
        //         await deleteFileFromS3(applicants.attachment);
        //     }
        //     await applicants.remove();
        // }

        // if(internship){
        //     if(internship.attachment){
        //         await deleteFileFromS3(internship.attachment);
        //     }
        //     await internship.remove();
        // }

        
        //await userProfile.remove();
        const auth = await Authentication.findByIdAndDelete(userId);

        return res.status(200).send({success:true,message:"Deleted user successfully" });

    }catch (error) {
        return res.status(500).send({success:false,message:`Error while deleting user: ${error.message}`});
    }
}

export default deleteUserByAdmin;