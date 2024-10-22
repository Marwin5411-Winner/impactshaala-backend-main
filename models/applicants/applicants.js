import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const applicants = Schema({
    userId: {
        type: Schema.Types.ObjectId,
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
        required:true,
    },
    attachmentType:{
        type:String,
        default:''
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'OPEN'
    }
},{
    timestamps:true,
  },
);


const Applicants = mongoose.model('Applicants',applicants);

export default Applicants;