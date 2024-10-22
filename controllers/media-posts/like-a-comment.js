import MediaPosts from "../../models/media_posts/media-posts.js"
import User from "../../models/user/user.js";


async function likeCommentedPost(req, res, next) {
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {id} = req.params;

        const {commentId} = req.body;

        const profile = await User.findOne({authId:userId});
        if(!profile){
            return res.status(404).json({success:false,message:"User not found"});
        }

        let mediaPost = await MediaPosts.findById(id);

        if(!mediaPost){
            return res.status(404).json({success:false,message:"Couldn't fetch the media post"});
        }

        for(let i = 0; i < mediaPost.comments.length; i++){
            let comment = mediaPost.comments[i];
            if(comment._id.toString()===commentId.toString()){
                if(!comment.likes.includes(profile._id)){
                    comment.likes.push({_id:profile._id});
                    await mediaPost.save();
                    break;
                }else{
                    return res.status(400).json({success:false,message:"You have already liked the comment."});
                }
    
            }
        }

        return res.status(200).json({success:true,message:"You have liked comment."});

    }catch(err){
        return res.status(500).json({success: false,message: err.message});
    }
}

export default likeCommentedPost;