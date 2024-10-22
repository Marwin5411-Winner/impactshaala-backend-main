import Authentication from "../../../models/auth/authenication.js";
import mongoose from "mongoose";


async function changeUserStatus(req,res){
    try {
        const {uid} = req.query;
        const userId = new mongoose.Types.ObjectId(uid);
        let currstat = req.body.newstat;

        // if(currstat!=="UNBLOCK"){
        //     currstat=false;
        // }else{
        //     currstat =true;
        // }

        var result = await Authentication.findByIdAndUpdate(userId, {isActive:currstat});

        res.json({status: "success",result });

      } catch (error) {
        console.error('Error updating user:', error);
      }
}



async function changeVerificationStatus(req,res){
    try {
        const {uid} = req.query;
        console.log(`User Id : ${uid}`);
        const userId = new mongoose.Types.ObjectId(uid);
        let currstat = req.body.newstat;


        // if(currstat==="NOT VERIFIED"){
        //     currstat=false;
        // }else{
        //     currstat = true;
        // }

        var result = await Authentication.findByIdAndUpdate(userId, {isVerified:currstat});

        console.log(`Result : ${result}`);

        res.json({status: "success",result });

      } catch (error) {
        console.error('Error updating user:', error);
      }
}

export  {changeUserStatus,changeVerificationStatus};