import MediaPosts from "../../models/media_posts/media-posts.js"
import mongoose from "mongoose";
import User from "../../models/user/user.js";
import Report from '../../models/reported_posts/reported_posts.js';


async function reportPost(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {id} = req.params;
        const {reason} = req.body;

        const profile = await User.findOne({authId:userId});

        if(!profile){
            return res.status(401).json({success:false,message:"User not found"});
        }

        let mediaPosts = await MediaPosts.findById({_id: id});
        if(!mediaPosts) return res.status(404).json({success: false,message:"Couldn't find the media post."})

        if(mediaPosts.userId.toString() === profile._id.toString()) return res.status(400).json({success: false, message: "You cannot report your own post!!"})

        const prevReport = await Report.findOne({userId: profile._id, media_post_id: id})
        if(prevReport) return res.status(400).json({success: false, message: "You have already reported this post"})

        const report = await Report({userId: profile._id, type: "MEDIA_POST", media_post_id: id, reason})
        await report.save()

        return res.status(200).json({success:true,message:"You have reported the media post successfully."});

    } catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default reportPost;