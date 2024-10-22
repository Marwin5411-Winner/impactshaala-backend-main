import mongoose from 'mongoose';
import {reportPostsContent} from "../../consts/userenums.js";

const Schema = mongoose.Schema;


const polls = Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    keywords:[{
        type:mongoose.Types.ObjectId,
        ref:'collaboration'
    }],
    question:{
        type:String,
        required:true,
    },
    duration:{
        type:Date,
        required:true,
    },
    caption:{
        type:String,
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    options: {
        type: [{
            text: String,
            votes: [{
                type: Schema.Types.ObjectId,
                ref: 'User',
            }]
        }],
        default: [],
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: "comments",
            required: true,
        }
    ]
},{timestamps:true})

const Polls = mongoose.model('polls', polls);

export default Polls;