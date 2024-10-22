import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";

async function listMyPolls(req,res,next){
    try{
        const userId = req.user.id;
        const user = await User.findOne({authId:userId});

        if(!user){
            return res.status(400).json({success:false,message:"User not found"});
        }

        const polls = await Polls.find({userId:user._id})
            .populate({path:'userId',select:'name profilePic'})
            .populate({path: 'comments'})
            .populate({path: "comments", populate: {path: "writer", select: "name profilePic"}})
        if(!polls){
            return res.status(400).json({success:false,message:"You haven't posted any polls yet."});
        }

        return res.status(200).json({success:true,data:polls.reverse()});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default listMyPolls;