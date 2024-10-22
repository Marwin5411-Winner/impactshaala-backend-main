import Authentication from '../../models/auth/authenication.js';
import {checkEmail} from '../../utils/check-input-fields.js'
import generateVerifyToken  from '../../utils/encryptionhelper.js';
import sendMailForPasswordReset from '../../utils/helper/reset_password_link_helper.js'


async function requestPasswordReset(req,res,next){
    try{
        let {email} = req.body;

        email = email.trim();

        const isEmailValid = checkEmail(email);

        if(isEmailValid!==true) {
            return res.status(400).json({success: false,message: 'Invalid email format'});
        }

        let user = await Authentication.findOne({email: email});

        if(user===null){
            return res.status(400).json({message:"Email not found"});
        }

        if(user.isVerified === "VERIFIED"){
            const createVerifyToken = generateVerifyToken(user.id,Date.now(),"20m");

            await sendMailForPasswordReset({email:user.email,resetPasswordTokenId:createVerifyToken});

            return res.status(200).json({
                success:true,
                message:"Reset Password link has successfully sent to your email.Please check",
            });
        }else{
            return res.status(401).json({
                success:false,
                message:"Please verify your email address before resetting your password."
            });
        }


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

export default requestPasswordReset;