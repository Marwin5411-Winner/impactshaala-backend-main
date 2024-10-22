import Authentication from '../../models/auth/authenication.js';
import User from '../../models/user/user.js';
import verifyAndDecryptToken from "../../utils/decryptionhelper.js"
import SENDMAIL from '../../utils/helper/account_verification_helper.js';
import sendMailWelcomeNote from '../../utils/helper/welcome_note.js';
import createNotification from '../../utils/notification/sendGeneralNotification.js';

async function verifyAccount(req,res,next){
    try{

        // take token which is encrypted from headers
        const encryptedToken = req.headers.authorization;

        if(encryptedToken===null){
            return res.status(500).json({message:"something went wrong"});
        }

        // decrypt the token and verify the userId
        const verifyToken = await verifyAndDecryptToken(encryptedToken,res);

        let auth = await Authentication.findById(verifyToken.userId);

        let user = await User.findOne({
            authId: verifyToken.userId
        });

        if(!auth){
            return res.status(401).json({message:"Invalid User"});
        }

        if(auth.isVerified!=="VERIFIED"){
           // console.log(`Inside If in is account verified`);
            if(!auth){
                return res.status(400).json({
                success: false,
                message:"User not found",
            });
            }

            auth.isVerified = "VERIFIED";
            auth.save();

            await SENDMAIL({email:auth.email});

            await sendMailWelcomeNote({email: auth.email});





            //add Notification to that user
            await createNotification(user._id ,"Welcome to Our Platform","OTHER");

            return res.status(200).json({
            success :true,
            message: "Account verified successfully",});
        }else{
           // console.log(`Inside If in is account verified`);

            res.status(400).json({
                success:true,
                message:"Your account is already verified"
            })
        }


    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

export default verifyAccount;