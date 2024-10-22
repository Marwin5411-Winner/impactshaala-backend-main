import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";
import Report from '../../models/reported_posts/reported_posts.js';

async function reportPolls(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const {id} = req.params;
        const userProfile = await User.findOne({authId: userId});

        const {reason} = req.body;

        if(!userProfile){
            return res.status(404).json({success: false,message:"Couldn't find polls for you."});
        }

        let poll = await Polls.findById(id);
        if(!poll) return res.status(404).json({success: false,message:"Couldn't find polls for you are looking for."});
        if(poll.userId.toString() === userProfile._id.toString()) return res.status(400).json({success: false, message: "You cannot report your own poll"})

        const prevReport = await Report.findOne({userId: userProfile._id, polls_id: id})
        if(prevReport) return res.status(400).json({success: false, message: "You have already reported this poll"})

        const report = await Report({userId: userProfile._id, type: "POLL", polls_id: id, reason})
        await report.save()

        return res.status(200).json({success: true,message:"You have reported this poll successfully."});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default reportPolls;