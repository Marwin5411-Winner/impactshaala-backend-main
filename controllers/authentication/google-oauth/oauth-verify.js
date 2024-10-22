import { OAuth2Client } from 'google-auth-library';
import Authentication from '../../../models/auth/authenication.js';
import sendToken from '../../../utils/send-token.js';
import User from "../../../models/user/user.js";
import generateVerifyToken from "../../../utils/encryptionhelper.js";
import SENDMAIL from "../../../utils/helper/email_verification_helper.js"

const client = new OAuth2Client();

async function verify(req,res,next) {

    // take token which is encrypted from headers
    let token = req.headers.authorization;

    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        let payload = ticket.getPayload();
        const userid = payload['sub'];
        // Access the email from the payload
        const email = payload.email;

        // console.log(`Check user email : ${email}`);
        // If the request specified a Google Workspace domain:
        // const domain = payload['hd'];
        const auth = await Authentication.findOne({email:email});
        if(!auth){
            return res.status(404).json({success:false,message:"Kindly please register your account in our platform."});
        }


        const userProfile = await User.findOne({authId:auth.id}).populate("authId");
        if(!userProfile){
            return res.status(404).json({success:false,message:"Kindly please register your account in our platform. It's free"})
        }

        let createdTime = Date.now();

        if(auth.isVerified!=="VERIFIED"){
            const createVerifyToken = generateVerifyToken(auth._id,Date.now(),'10m');
            // console.log(`Verify Token : ${createVerifyToken}`);
            // Send an Email to verify the user account
            await SENDMAIL({email:email.trim(),name:userProfile.name, verifyTokenID:createVerifyToken});
            return res.status(401).json({
            success:false,
            message : "We have sent a verification email to verify your account. Kindly check your mailbox"
        });
        }

        // console.log(`UserId verified by google: ${userid}`);
        // return res.status(200).json({success: true,message: "verified"});
        sendToken(userProfile,200,res,createdTime);
    }catch(err){
        return res.status(500).json({success: false,message: err.message});
    }

}


export default verify;
