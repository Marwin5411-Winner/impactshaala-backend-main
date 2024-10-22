import Applicants from "../../models/applicants/applicants.js";
import checkUserPermission from "../../utils/check-user-permission.js";
import User from "../../models/user/user.js";

async function listAllApplicants(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const user = await User.findOne({authId: userId});

        if(!user){
            return res.status(404).json({success: false,message: "User not found"});
        }

        let checkPermission =await checkUserPermission(userId,res,next);

        if(checkPermission!==true){
            return res.status(401).json({success:false,message:"You do not have permission to view a job or internship"});
        }

        const appliedApplicants = await Applicants.find().populate({path:'userId'} )
        if(appliedApplicants.length===0){
            return res.status(404).json({success:false,message:"Couldn't find any Applicants, please try again later"});
        }
        return res.status(200).json({success:true,data:appliedApplicants});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default listAllApplicants;