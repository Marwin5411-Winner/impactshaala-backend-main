import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";


async function likePoll(req,res,next){
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

        if(poll.likes.includes(userProfile._id)){
            return res.status(400).json({success:false,message:"You have already liked this poll"});
        }

        poll.likes.push(userProfile._id);
        await poll.save();

        await createNotification(polls.userId, "Someone is Like on your Poll Question", "LIKE");

	  await sendNotificationEmail({
		email: auth.email,
		userName: user.name,
		notificationType: "LIKE",
		notificationMessage: "Someone has Like your poll",
		actionLink: "https://impactshaala.com/",
	  });

        return res.status(200).json({success:true,message:"You have like this poll"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default likePoll;