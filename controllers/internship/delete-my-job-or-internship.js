import Internship from "../../models/internship/internship.js";
import checkUserPermission from "../../utils/check-user-permission.js";
import User from "../../models/user/user.js";

async function deleteMyJobOrInternship(req,res,next){
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
        console.log(`User Profile : ${userProfile._id}`);

        if(!userProfile){
            return res.status(404).json({success:false,message:"User not found"})
        }

        let job = await Internship.findById(jobId);

        if(!job){
            return res.status(404).json({success:false,message:"Couldn't find the job your looking for"})
        }


        if(job.userId.toString()===userProfile.id){
            job = await Internship.findByIdAndDelete(jobId);
            return res.status(200).json({success:true,message:"Job deleted successfully"});
        }else{
            return res.status(401).json({success:false,message:"You don't have an access to delete this job"});
        }

    }catch(err){
        return res.status(500).json({success:false, message:err.message});
    }
}


export default deleteMyJobOrInternship