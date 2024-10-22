import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";

async function getRelatedPolls(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const profile = await User.findOne({authId:userId}).populate({path:'collabKeywords'});
        if(!profile){
            return res.status(404).json({success:false,message: "Couldn't find polls for you"});
        }

        // Extract collabTags from the user's profile
        const userCollabTags = profile.collabKeywords.map(keyword => keyword.collabTag);

        const relatedPolls = [];

        const polls = await Polls.find()
            .populate({path:'keywords'})
            .populate({path:'userId',select:'name profilePic'})
            .populate({path: "comments"})
            .populate({path: "comments", populate: {path: "writer", select: "name profilePic"}})


        if(!polls){
            return res.status(404).json({success:false,message: "No polls found"});
        }

        for(const poll of polls){
            const pollTags = poll.keywords.map(keyword=>keyword.collabTag);
            const intersection = userCollabTags.filter(tag => pollTags.includes(tag));
            if (intersection.length > 0) {
                relatedPolls.push(poll);
            }
        }

        return res.status(200).json({success:true,data:relatedPolls.reverse()});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default getRelatedPolls;