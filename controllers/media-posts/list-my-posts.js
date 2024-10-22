import MediaPosts from "../../models/media_posts/media-posts.js"
import User from "../../models/user/user.js";

async function listMyPost(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const profile = await User.findOne({authId:userId});

        if(profile.length===0){
            return res.status(404).json({success:false,message:"User not found"});
        }

        const myPosts = await MediaPosts.find({userId:profile._id})
            .populate({path:'userId', select: "name profilePic"})
            .populate({path:'comments'})
            .populate({path: 'comments', populate:{path:'writer',select:'name profilePic'}});
        

        if(myPosts.length===0){
            return res.status(404).json({success:false,message:"Looks like there's nothing here. Why not share something?"});
        }

        return res.status(200).json({success:true,data:myPosts.reverse()});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


export default listMyPost;