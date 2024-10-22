import Authentication from '../../models/auth/authenication.js';
import bcrypt from 'bcryptjs';
import sendToken from '../../utils/send-token.js';
import {checkEmail} from '../../utils/check-input-fields.js'
import generateVerifyToken  from '../../utils/encryptionhelper.js';
import SENDMAIL from "../../utils/helper/email_verification_helper.js";
import User from '../../models/user/user.js';


async function loginToAccount(req,res,next){
    try{
        let {email,password} = req.body;

        if(!email || !password){
           return res.status(400).json({
                message : "Please provide required fields"
            });
        }

        email = email.trim();
        password = password.trim();

        // Check if the email is in a valid format
        const isEmailValid = checkEmail(email);

        if(isEmailValid!==true) {
            return res.status(400).json({success: false,message: 'Invalid email format'});
        }

        let user = await Authentication.findOne({email: email}).lean();

        if(user===null){
          return  res.status(400).json({
                message : "Email not found"
            });
        }

        const checkPasswordMatched = await bcrypt.compare(password,user.password);

        if(!checkPasswordMatched){
            return res.status(401).json({
                message : "Invalid credentials"
            });
         }

         if(user.isActive!="ACTIVE"){
            return res.status(401).json({
                success:false,
                message:"Please reach out to the administrator as you have been blocked by them"
            });
        }

        let createdTime = Date.now();

        let userProfile;

        // userProfile =  await User.find();

        userProfile = await User.findOne({authId:user._id}).populate({path:"authId",select:"email isActive isVerified"});

        /*
        // console.log(`User Profile : ${userProfile}`);

        // if(userProfile===null){
        //     userProfile = await User.find();

        //     console.log(`Null user check passed : ${userProfile.data}`);

        //     let checkAdmin = userProfile.map(getAdmin => getAdmin.admins.map(admin=>admin.authId.toString()===user._id.toString()));

        //     console.log(`Check Admin: ${checkAdmin}`);
        //     return;
        // }

        */

        // if(userProfile.accountType !== 'ORGANIZATION'){
        //     userProfile = await User.findOne({authId:user._id}).populate({path:"authId",select:"email isActive isVerified"}).select(['-admins']);
        // }
        

         if(user.isVerified!=="VERIFIED"){
            const createVerifyToken = generateVerifyToken(user._id,Date.now(),'10m');
            //console.log(`Verify Token : ${createVerifyToken}`);
            // Send an Email to verify the user account
            await SENDMAIL({email:email.trim(),name:userProfile.name, verifyTokenID:createVerifyToken});
            return res.status(401).json({
            success:false,
            message : "We have sent a verification email to verify your account. Kindly check your mailbox"
        });
        }


        // // remove the password field from the response
        // delete user.password;
        // delete user.isVerified;

        sendToken(userProfile,200,res,createdTime);
     }
     catch(err){
        res.status(500).json({
            success:false,
            err:err.message
        })
     }

}


export default loginToAccount;