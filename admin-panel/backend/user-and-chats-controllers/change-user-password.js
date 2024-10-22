import Authentication from "../../../models/auth/authenication.js";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

async function changeUserPassword(req,res){
    try {
        const {uid} = req.query;
        const userId = new mongoose.Types.ObjectId(uid);
        const newPassword = req.body.newPassword;

        let hashedPassword;

        if(newPassword !== ""){
            hashedPassword = await bcrypt.hash(newPassword.trim(), 10);
        }

        var result = await Authentication.findByIdAndUpdate(userId, {password:hashedPassword});

        res.json({status: "success",result });

      } catch (error) {
        console.error('Error updating user:', error);
      }
}

export default changeUserPassword;