import {showAllChatSettings} from "../../utils/show_chats_settings.js";

async function chatSettingConfigOptions(req,res,next) {
    try{
        const data = showAllChatSettings;
        return res.status(200).json({success:true,data:data});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default chatSettingConfigOptions;