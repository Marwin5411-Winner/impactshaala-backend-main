import Authentication from '../../models/auth/authenication.js';
import BlockedChats from '../../models/blocked_chats/blocked_chats.js'

async function blockUser(req, res,next) {
    const userId = req.user.id;
    try{
        const userProfile = await Authentication.findById(userId);

        if(!userProfile){
            return res.status(400).json({
            success: false,
            message:"User not found"});
        }

        const {recipientId} =  req.params;

        if(recipientId===userId){
            return res.status(400).json({
                success:false,
                message:"You can't block yourself"
            });
        }

        let blockedChats = await BlockedChats.find({senderId:userId,receiverId:recipientId});


        if(blockedChats.length>0){
            return res.status(400).json({success:false,message:"You have already blocked this user"});
        }

        blockedChats = await BlockedChats.create({
            senderId:userId,
            receiverId:recipientId,
        });


        if(!blockedChats){
            return res.status(400).json({
                success: false,
                message:"Unable to block the user"
            });
        }


        return res.status(200).json({success:true,message:"Successfully blocked the user"});

    }catch(err){
        res.status(500).json({
        success: false,
        message: err.message});
    }
}


export default blockUser;