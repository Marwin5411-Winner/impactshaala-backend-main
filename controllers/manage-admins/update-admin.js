import User from "../../models/user/user.js";
import Authentication from "../../models/auth/authenication.js";
import bcrypt from 'bcryptjs';
import {checkEmail} from "../../utils/check-input-fields.js";


async function updateAdmin(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        let user = await User.findOne({authId: userId});

        if(user.length===0){
            return res.status(404).json({success:false,message: "User not found"});
        }

        if(user.accountType==='INDIVIDUAL'){
            return res.status(400).json({success:false,message:"Individual account doesn't have permission to update the admins."});
        }

        let {name,authId} = req.body;

        let hashedPassword;
        let updateName;
        let updateEmail;
        let auth;

        if(name){
            updateName = name.trim();
        }


        if(authId.email){
            updateEmail = authId.email.trim();
        }

        if(authId.password){
            hashedPassword = await bcrypt.hash(authId.password.trim(), 10);
        }

        const isEmailValid =  checkEmail(updateEmail);

        if(isEmailValid!==true) {
            return res.status(400).json({success: false,message: 'Invalid email format'});
        }

        if(hashedPassword){
            auth = await Authentication.findByIdAndUpdate(authId._id,{email:updateEmail,password:hashedPassword});
        }else{
            auth = await Authentication.findByIdAndUpdate(authId._id,{email:updateEmail});
        }


        // Find the index of the admin in the admins array
        const adminIndex = user.admins.findIndex(admin => admin.authId.toString() === authId._id.toString());

        // Check if the admin exists
        if (adminIndex !== -1) {
            // Update the name if provided
            if (updateName !== undefined) {
                user.admins[adminIndex].name = updateName;
            }

            // Save the changes to the user document
            await user.save();
        } else {
            // Handle the case where the admin is not found
            return res.status(404).json({ success: false, message: "Admin not found" });
        }


        return res.status(200).json({success:true,message:"Admin updated successfully"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


export default updateAdmin;
