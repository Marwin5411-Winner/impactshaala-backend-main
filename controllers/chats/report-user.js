import Authentication from '../../models/auth/authenication.js';
import ReportedChats from '../../models/reported_chats/reported_chats.js'

async function reportUser(req, res,next) {
    const userId = req.user.id;
    try{

        const userProfile = await Authentication.findById(userId);
        if(!userProfile)return res.status(400).json({success: false, message:"User not found"})

        const {recipientId} =  req.params;
        if(recipientId===userId) return res.status(400).json({success:false, message:"You can't report yourself"});

        let reportedChats = await ReportedChats.find({senderId:userId, receiverId:recipientId});

        if(reportedChats.length>0) return res.status(400).json({success:false,message:"You have already reported this user"});

        reportedChats = await ReportedChats.create({senderId:userId, receiverId:recipientId});

        if(!reportedChats)return res.status(400).json({success: false, message:"Unable to report the user"});

        return res.status(200).json({success:true,message:"Successfully reported the user"});

    }catch(err){
        res.status(500).json({
        success: false,
        message: err.message});
    }
}


export default reportUser;