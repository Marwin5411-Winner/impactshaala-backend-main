import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";

async function listProfileById(req,res,next){
     // userId is received from isUserAuthenticated middleware
     const {id} = req.params

    try{
        // const {id} = req.params;
        // const userId =  new mongoose.Types.ObjectId(id);

        const userProfile = await User.findOne({_id:id});

        if(!userProfile){
            return res.status(404).json({success:false,message:"Couldn't find polls for you."});
        }

        const polls = await Polls.find({userId:userProfile._id})
            .populate({path: "userId", select: "name profilePic"})
            .populate({path: "comments"})
            .populate({path: "comments", populate: {path: "writer", select: "name profilePic"}})

        if(!polls){
            return res.status(404).json({success:false,message:"No polls were posted by the user"})
        }

        return res.status(200).json({success:true,data:polls.reverse()});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default listProfileById;