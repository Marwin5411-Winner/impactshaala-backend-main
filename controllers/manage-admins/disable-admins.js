import Authentication from "../../models/auth/authenication.js";
import checkUserPermission from "../../utils/check-user-permission.js";

async function disableAdmins(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {disableId} = req.params;

        const checkAccess =  checkUserPermission(userId);

        if(checkAccess===false){
            return res.status(400).json({success:false,message:"Account type of Individuals can't disable admins"});
        }

        let auth = await Authentication.findById(disableId);

        if(auth.length===0){
            return res.status(400).json({success:false,message:"The Admin you are trying to disable does not exist"});
        }

        if(auth.isActive === "BLOCK"){
            return res.status(400).json({success:false,message:"You have already disabled this account"});
        }

        auth.isActive = "BLOCK";
        await auth.save();

        return res.status(200).json({success:true,messages:"You have disabled this admin user"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


export default disableAdmins;