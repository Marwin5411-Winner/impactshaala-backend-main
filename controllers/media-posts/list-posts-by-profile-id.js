import MediaPosts from "../../models/media_posts/media-posts.js"
import User from "../../models/user/user.js";
import mongoose from "mongoose";

async function getPostListsBasedOnProfileId(req,res,next){
     // userId is received from isUserAuthenticated middleware
     const userId = req.user.id;
    try{
        const {id} = req.params;
        // convert the string type of id to type of ObjectId
        const getProfileId = new mongoose.Types.ObjectId(id);

        const profile = await User.findById(getProfileId);
        if(!profile){
            return res.status(404).json({success:false,message:"No user found"});
        }

        const mediaPosts = await MediaPosts.find({userId:profile._id})
            .populate({path:'userId',select:'name profilePic'})
            .populate({path: "comments"})
            .populate({path:'comments',populate:{path:'writer',select:'name profilePic'}});

        if(!mediaPosts){
            return res.status(404).json({success:false,message:"No posts found from this user"});
        }

        return res.status(200).json({success:true,data:mediaPosts.reverse()});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default getPostListsBasedOnProfileId;