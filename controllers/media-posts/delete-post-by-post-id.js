import MediaPosts from "../../models/media_posts/media-posts.js"
import User from "../../models/user/user.js";
import {deleteFileFromS3} from "../../utils/s3_bucket.js";


async function deleteMyPost(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {postId} = req.params;
        const user = await User.findOne({authId:userId});
        let myPosts = await MediaPosts.findById(postId);

        if(myPosts.userId.toString()===user._id.toString()){
            let images = await myPosts.image;
            for(let i=0; i<images.length; i++){
                if(images){
                    await deleteFileFromS3(images[i]);
                }
            }
            myPosts = await MediaPosts.findByIdAndDelete(postId);
            return res.status(200).json({success:true,message:"Post delete successfully."});
        }else{
            return res.status(401).json({success:false,message:"You can't delete others post"})
        }

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


export default deleteMyPost;