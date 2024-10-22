import Authentication from '../../models/auth/authenication.js';
import verifyAndDecryptToken from "../../utils/decryptionhelper.js";
import bcrypt from 'bcryptjs';
import passwordChangedSuccessfully from '../../utils/helper/password_changed_successfully.js';


async function setNewPasswordByResetToken(req,res){
    try{
        const encryptedToken = req.headers.authorization;
        let {password} = req.body;

        //trim extra spaces
        password = password.trim();

        if(encryptedToken===null){
            return res.status(500).json({
                success:false,
                message:"Something went wrong"});
        }

        const verifyToken = await verifyAndDecryptToken(encryptedToken,res);
        var expirationTime = verifyToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        // Calculate remaining time in seconds
        const remainingTimeInSeconds = expirationTime - currentTime;

        if(remainingTimeInSeconds>0){

            const userId = verifyToken.userId;
            const hashedPassword = await bcrypt.hash(password.trim(), 10);

            let userProfile = await Authentication.findByIdAndUpdate(userId,
                {password:hashedPassword},
                { new: true }
            );

            await passwordChangedSuccessfully(userProfile.email);

            return res.status(200).json({
            success:true,
            message:"Password reset was successful",
            data:userProfile
        });

        }


    }catch(err){
        return res.status(500).json({message:err.message});
    }
}


export default setNewPasswordByResetToken;