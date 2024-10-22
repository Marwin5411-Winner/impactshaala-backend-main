import Authentication from '../../models/auth/authenication.js';
import {checkEmail} from '../../utils/check-input-fields.js'


async function isEmailAlreadyInUse(req, res, next) {
    try {
        let {email} = req.body;

        if(email){
            email = email.trim();
        }

        // Check if the email is in a valid format
        const isEmailValid = checkEmail(email);

        if(isEmailValid!==true) {
            return res.status(400).json({success: false,message: 'Invalid email format'});
        }

        let auth = await Authentication.findOne({ email: email });
        if (auth===null) {
            return res.status(200).json({
                success:true,
                message:"Email not in use",
            });
        }else{
            return res.status(400).json({
                success:false,
                message: "Email already in use" ,
            });
        }
    } catch (err) {
        return res.status(500).json({
        success:false,
        message: `Please enter your right email address: ${err.message}` });
    }
}

export default isEmailAlreadyInUse;