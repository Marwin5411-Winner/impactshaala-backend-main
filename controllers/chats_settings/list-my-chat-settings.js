import ChatsSettings from "../../models/chats_settings/chats_settings.js";
import User from "../../models/user/user.js";

async function listMyChatSettings(req, res, next) {
    try{
        // userId is received from isUserAuthenticated middleware
        const userId = req.user.id;

        // using userId get userProfile id
        const userProfile = await User.findOne({authId: userId});

        if(!userProfile){
            return res.status(404).json({success:false, message:"User not found"});
        }

        // first check whether the user as chat settings if not then create with default options
        let chatSettings = await ChatsSettings.findOne({userID:userProfile._id});

        if(chatSettings===null){
            chatSettings = await ChatsSettings.create({
                userID:userProfile._id,
        });

            return res.status(200).json({success:true,data:chatSettings});
        }

        return res.status(200).json({success:true, data:chatSettings});

    }catch(err){
        return res.status(500).json({success: false,message: err.message});
    }
}

export default listMyChatSettings;