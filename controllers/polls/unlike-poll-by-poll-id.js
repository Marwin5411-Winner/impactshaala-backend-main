import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";


async function unLikePoll(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {id} = req.params;

        const userProfile = await User.findOne({authId:userId});

        if(!userProfile){
            return res.status(404).json({success: false,message: "Couldn't find the profile"});
        }

        let poll = await Polls.findById(id);

        if(!poll){
            return res.status(404).json({success:false,message:"Couldn't find the poll"})
        }

        if(!poll.likes.includes(userProfile._id)){
            return res.status(400).json({success:false,message:"You have already remove like from this poll"});
        }

        poll.likes.remove(userProfile._id);
        await poll.save();

        return res.status(200).json({success:true,message:"You have removed like from this poll"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default unLikePoll;