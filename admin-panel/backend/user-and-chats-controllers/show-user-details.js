import User from "../../../models/user/user.js";
import mongoose from "mongoose";
import {usersSchemaEnums,verificationStatus} from '../../../consts/userenums.js'

const userEnums = usersSchemaEnums.status;
const verificationEnums = verificationStatus.status;

async function showUserDetails(req, res) {
    const {uid} = req.query;
    const userId = new mongoose.Types.ObjectId(uid);
    const userData = await User.findOne({authId:userId}).populate({path:'authId',select:'email isActive isVerified'});
	return res.render("users/user-details", {currentPage: "user-details",userData:userData, userEnums:userEnums,verificationEnums:verificationEnums});
}

export default showUserDetails;