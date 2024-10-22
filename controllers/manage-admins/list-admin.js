import User from "../../models/user/user.js";
import checkUserPermission from "../../utils/check-user-permission.js";

async function listAdmins(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const checkAccess =  checkUserPermission(userId);

        if(checkAccess===false){
            return res.status(400).json({success:false,message:"Account type of Individuals can't view admins"});
        }

        const user = await User.findOne({authId:userId}).select('admins').populate({path:'admins',populate:{path:'authId',select:'email isVerified isActive'}});
        if(user.length===0){
            return res.status(404).json({success:false,message:"No admins found, please create or add admins"});
        }

        return res.status(200).json({success:true,data:user});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default listAdmins;