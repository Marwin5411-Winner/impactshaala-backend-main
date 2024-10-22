import Authentication from '../../models/auth/authenication.js';
import bcrypt from 'bcryptjs';
import passwordChangedSuccessfully from '../../utils/helper/password_changed_successfully.js';

async function changePassword(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{

        let {newPassword} = req.body;
        if(!newPassword){
            res.status(400).json({success: false,message:"Please provide password"})
        }
        newPassword = newPassword.trim();
        let userProfile = await Authentication.findById(userId);

        if(userProfile===null){
            res.status(404).json({success: false,message:"User not found"});
        }

        const checkPasswordMatched = await bcrypt.compare(newPassword,userProfile.password);

        if(checkPasswordMatched){
            return res.status(400).json({
                message : "New Password can't be same of current password"
            });
         }

        let hashedPassword = await bcrypt.hash(newPassword, 10);

        userProfile = await Authentication.findByIdAndUpdate(userId,{password:hashedPassword},{new:true});

         // send Email if the password change was successful
         await passwordChangedSuccessfully(userProfile.email);

        return res.status(200).json({
            message:"Password Changed Successful"
        });


    }catch(err){
        res.status(500).json({message:err.message});
    }
}


export default changePassword;