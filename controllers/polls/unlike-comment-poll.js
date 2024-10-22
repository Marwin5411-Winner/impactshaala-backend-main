import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";

async function unlikeCommentPoll(req, res, next) {
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {id} = req.params;

        const {commentId} = req.body;

        const profile = await User.findOne({authId:userId});
        if(!profile){
            return res.status(404).json({success:false,message:"User not found"});
        }

        let polls = await Polls.findById(id);

        if(!polls){
            return res.status(404).json({success:false,message:"Couldn't fetch the poll"});
        }


        for(let i = 0; i < polls.comments.length; i++){
            let poll = polls.comments[i];
                if(poll._id.toString()===commentId.toString()){
                    if(poll.likes.includes(profile._id)){
                        poll.likes.remove({_id:profile._id});
                        await polls.save();
                        break;
                    }else{
                        return res.status(400).json({success:false,message:"You have already removed like from the comment."});
                    }
                }
        }

        return res.status(200).json({success:true,message:"You have removed like from this comment."});

    }catch(err){
        return res.status(500).json({success: false,message: err.message});
    }
}

export default unlikeCommentPoll;