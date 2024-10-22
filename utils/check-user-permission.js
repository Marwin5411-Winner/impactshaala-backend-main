// This a utility function that checks whether user has permission to post a job or not

import User from "../models/user/user.js";

const checkUserPermission = async(userId,res,next)=>{
    try {
        let user = await User.findOne({authId:userId});
        return user.userType1.toLowerCase() !== "student"
    } catch(err) {
        console.log(`Error while checking permissions`);
        return res.status(500).json({success:false,message:err.message});
    }
}


export default checkUserPermission;