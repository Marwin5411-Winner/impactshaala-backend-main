import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const internship = Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required:true
    },
    jobPostingType:{
        type:String,
        required: true,
    },
    jobTitle:{
        type:String,
        required: true,
    },
    workplaceType:{
        type:String,
        required: true,
    },
    jobLocation:{
        type:String,
        default:''
    },
    jobType:{
        type:String,
        required: true,
    },
    communicationType:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
    },
    email:{
        type:String,
    },
    attachment:{
        type:String,
        default:''
    },
    attachmentType:{
        type:String,
        default:''
    },
    status:{
        type:String,
        default:'OPEN'
    },
    numberOfOpenings: {
        type: Number,
        default: 0,
    },
    lastDateToApply: {
        type: Date,
        default: Date.now(),
    }
},{
    timestamps:true,
  },
);


const Internship = mongoose.model('Internship',internship);

export default Internship;