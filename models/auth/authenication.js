import mongoose from 'mongoose';
import {verificationStatus,usersSchemaEnums} from "../../consts/userenums.js";


const authentication = mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
    },
    isActive:{
        type:String,
        enum:usersSchemaEnums.status,
        default:"ACTIVE"
    },
    isVerified:{
        type:String,
        enum:verificationStatus.status,
        default: "NOTVERIFIED"
    },
},{
    timestamps:true,
});


const Authentication = mongoose.model('authentication',authentication);

export default Authentication;