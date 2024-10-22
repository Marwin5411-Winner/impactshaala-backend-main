
import Authentication from "../../models/auth/authenication.js";
import checkUserPermission from "../../utils/check-user-permission.js";

async function enableAdmins(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {enableId} = req.params;

        const checkAccess =  checkUserPermission(userId);

        if(checkAccess===false){
            return res.status(400).json({success:false,message:"Account type of Individuals can't enable admins"});
        }

        let auth = await Authentication.findById(enableId);

        if(auth.length===0){
            return res.status(400).json({success:false,message:"The Admin you are trying to enable does not exist"});
        }

        if(auth.isActive === "ACTIVE"){
            return res.status(400).json({success:false,message:"User account is already active"});
        }

        auth.isActive = "ACTIVE";
        await auth.save();

        return res.status(200).json({success:true,messages:"You have enabled this admin user again."});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


export default enableAdmins;