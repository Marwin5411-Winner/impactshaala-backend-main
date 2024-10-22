import Internship from "../../models/internship/internship.js";
import User from "../../models/user/user.js";
import checkUserPermission from "../../utils/check-user-permission.js";

async function listMyJobOrInternshipPosting(req, res, next) {
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try{
        const user = await User.findOne({authId: userId});

        if(!user){
            return res.status(404).json({success: false,message: "User not found"});
        }

        var checkPermission =await checkUserPermission(userId,res,next);

        if(checkPermission!==true){
            return res.status(401).json({success:false,message:"You do not have permission to post a job or internship"});
        }

        if(checkPermission!==true && checkPermission!==false){
            return res.status(500).json({success:false,message:"Something went wrong"});
        }


        console.log(`Jobs : ${user._id}`);

        const jobs = await Internship.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit) // Skip documents based on current page and limit
        .limit(limit); // Limit the number of documents per page

        if(!jobs){
            return res.status(400).json({success: false,message: "Couldn't find your job listing"});
        }

        return res.status(200).json({success: true,data: jobs});

    }catch(err){
        return res.status(500).json({success: false,message: err.message});
    }
}


export default listMyJobOrInternshipPosting;