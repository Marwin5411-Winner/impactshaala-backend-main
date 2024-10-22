import ChatsSettings from "../../models/chats_settings/chats_settings.js";
import User from "../../models/user/user.js";

async function updateMyChatSettings(req,res,next){
    try{
        // userId is received from isUserAuthenticated middleware
        const userId = req.user.id;

        const {chat_setting} = req.body;

        // using userId get userProfile id
        const userProfile = await User.findOne({authId:userId});
        if(!userProfile){
            return res.status(404).json({success:false, message:"User not found"});
        }

        // first check whether the chat settings for this particular id is already present or not if present then update the chat settings
        let chatSettings = await ChatsSettings.findOneAndUpdate({userID:userProfile._id},{receiveMessagesFrom:chat_setting},{new:true});


        if(chatSettings===null){
            return res.status(404).json({success:true,message:"Couldn't find your chat settings, please try again later"});
        }

        if(!chatSettings){
            return res.status(400).json({success:false,message:"Couldn't save changes, please try again later"});
        }

        return res.status(200).json({success:true,message:"Changes saved successfully"});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default updateMyChatSettings