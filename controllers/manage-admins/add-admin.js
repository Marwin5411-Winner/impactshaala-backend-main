import User from "../../models/user/user.js";
import Authentication from "../../models/auth/authenication.js";
import bcrypt from 'bcryptjs';
import {checkEmail} from "../../utils/check-input-fields.js";

async function addAdmin(req,res,next){
     // userId is received from isUserAuthenticated middleware
     const userId = req.user.id;
    try{
        let createAdmin = await User.findOne({authId:userId});

        if(createAdmin.length===0){
            return res.status(404).json({success:false,message:"User not found"});
        }

        if(createAdmin.accountType==='INDIVIDUAL'){
            return res.status(400).json({success:false,message:"Individual account can't be added as admin"});
        }

        let {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Please provide required fields"});
        }


        name = name.trim();
        email = email.trim();
        password = password.trim();

        const isEmailValid =  checkEmail(email);

        if(isEmailValid!==true) {
            return res.status(400).json({success: false,message: 'Invalid email format'});
        }

        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        let auth = await Authentication.findOne({email:email});

        if(auth){
            return res.status(400).json({success:false,message:"User is already present with the specified email"});
        }

        auth = await Authentication.create({name:name,email:email,password:hashedPassword,isVerified:"VERIFIED"});

        if(createAdmin.admins.length>5){
            return res.status(400).json({success:false,message:"Maximum admins count reached, please delete any other user to add new admin"})
        }

        createAdmin.admins.push({ name: name, authId: auth._id });

        await createAdmin.save();

        return res.status(200).json({success:true,message:"Added user as admin."});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default addAdmin;