import mongoose from 'mongoose';
import {reportPostsContent} from "../../consts/userenums.js";

const Schema = mongoose.Schema;

const ReactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user
    type: { type: String, enum: ['Like', 'Love', 'Happy', 'HaHa', 'Think', 'Sad', 'Lovely'], required: true }, // Reaction type
  });

const mediaPostSchema = Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    image:{
        type:[String]
    },
    description:{
        type:String,
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    reactions: [ReactionSchema], // Array of reactions
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: "comments",
            required: true,
        }
    ]
},{timestamps:true});


const MediaPosts = mongoose.model('media-posts', mediaPostSchema);

export default MediaPosts;