import User from "../../models/user/user.js";
import Authentication from "../../models/auth/authenication.js";

async function deleteAdmin(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {deleteId} = req.params;

        let user = await User.findOne({authId: userId});

        if(user.length===0){
            return res.status(404).json({success:false,message: "User not found"});
        }

        if(user.accountType==='INDIVIDUAL'){
            return res.status(400).json({success:false,message:"Individual account don't have access to delete the admins."});
        }

        // Find the index of the admin in the admins array
        const adminIndex = user.admins.findIndex(admin => admin.authId.toString() === deleteId.toString());

        // Check if the admin exists
        if (adminIndex !== -1) {
            // Remove the admin from the array
            user.admins = user.admins.filter((admin, index) => index !== adminIndex);

            // Save the changes to the user document
            await user.save();
        } else {
            // Handle the case where the admin is not found
            return res.status(404).json({ success: false, message: "The Admin your trying to delete is not found. Maybe you have already deleted the admin." });
        }

        const auth = await Authentication.findByIdAndDelete(deleteId);

        return res.status(200).json({success:true,message:"Admin deleted successfully"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default deleteAdmin;