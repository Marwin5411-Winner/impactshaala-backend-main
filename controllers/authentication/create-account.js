import generateVerifyToken  from "../../utils/encryptionhelper.js"
import Authentication from '../../models/auth/authenication.js';
import SENDMAIL from "../../utils/helper/email_verification_helper.js";
import User from '../../models/user/user.js';
import bcrypt from 'bcryptjs';
import {checkEmail,checkNumberFields,checkPinCode} from '../../utils/check-input-fields.js';
import {s3_upload,s3_buffer_upload,imageExtension} from "../../utils/s3_bucket.js";


async function createAccount(req, res, next) {
    try {
        let {
        email,
        password,
        accountType,
        userType1,
        userType2,
        userType3,
        userType4,
        userType5,
        name,
        collabKeywords,
        tagline,
        description,
        website,
        countryCode,
        contactNo,
        comEmail,
        address,
        city,
        district,
        state,
        country,
        pinCode,
        profilePic } = req.body;

        // checking this fields for  undefined or which are empty
        const newUserType3 = req.body.userType3 || '';
        const newUserType4 = req.body.userType4 || '';
        const newUserType5 = req.body.userType5 || '';
        const newCountryCode = req.body.countryCode || '+91';
        const newTagline = req.body.tagline || '';
        const newDescription = req.body.description || '';
        const newWebsite = req.body.website || '';
        const newContactNo = req.body.contactNo || '';
        profilePic = profilePic || '';
        pinCode = pinCode || '';
        comEmail=comEmail || '';
        address=address || '';
        city=city || '';
        district=district || '';
        state=state || '';
        country=country || '';
        pinCode=pinCode || '';


        if(!email||
        !password||
        !accountType||
        !userType1||
        !name){
            return res.status(400).json({message:"Please provide required fields"});
        }

        if(email){
            const isEmailValid = checkEmail(email.trim());

            if(isEmailValid!==true) {
                return res.status(400).json({success: false,message: 'Invalid email format'});
            }
        }

        if(newContactNo!==''){
            checkNumberFields(contactNo,res);
            if(contactNo.length>10 || contactNo.length<10){
                return res.status(400).json({ message: "Contact number must be of 10 digits"});
            }
        }

        if(pinCode!==''){
            checkPinCode(pinCode,res);
            if(pinCode.length>6||pinCode.length<6){
                return res.status(400).json({ message: "Pin code must be of 6 digits"});
            }
        }

        if(comEmail!==''){
            const isEmailValid = checkEmail(comEmail.trim());

            if(isEmailValid!==true) {
                return res.status(400).json({success: false,message: 'Invalid email format'});
            }
        }


        let auth = await Authentication.findOne({ email: email });

        if (auth) {
            return res.status(400).json({ message: "We have already an account with this email. Kindly use different email." });
        }


        let hashedPassword;

        if(password.trim()!==''){
            hashedPassword = await bcrypt.hash(password.trim(), 10);
        }else{
            return res.status(400).json({success: false,message: "Password field cannot contain only empty spaces"});
        }


        // Save the user details to the database
        const newUser = new Authentication({
            email: email.trim(),
            password: hashedPassword
        });
        await newUser.save();

        let userId = newUser.id;

        const createVerifyToken = generateVerifyToken(userId,Date.now(),'10m');



        const profile = await User.create({
            authId : newUser.id,
            accountType:accountType.trim(),
            userType1 : userType1.trim(),
            userType2 : userType2.trim(),
            userType3 : newUserType3,
            userType4 : newUserType4,
            userType5 : newUserType5,
            name : name.trim(),
            collabKeywords:collabKeywords,
            tagline :newTagline,
            description : newDescription,
            website : newWebsite,
            countryCode :newCountryCode,
            contactNo : newContactNo,
            comEmail : comEmail.trim(),
            address : address.trim(),
            city : city.trim(),
            district : district.trim(),
            state : state.trim(),
            country : country.trim(),
            pinCode : pinCode.trim(),
        });

        if(profilePic!==''){
        // uploading user profile pic
        profilePic = profilePic.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          const buffer = Buffer.from(profilePic, "base64");
          const extension = imageExtension(
            buffer
          );
          let image = await s3_buffer_upload(
            buffer,
            `impactshaala`,
            `${profile._id}.${extension}`
          );
          profile.profilePic = image;
          await profile.save()
        }


        // Send an Email to verify the user account
        await SENDMAIL({email:email, name:name.trim(), verifyTokenID:createVerifyToken});

        return res.status(200).json({
            success:true,
            message: "Your account has been created successfully. We have sent an email to your account. Please verify."
        });

    } 
    catch (err) {
        return res.status(500).json({
            success:false,
            message: `Error while creating user : ${err.message}` });
    }
}


export default createAccount;
