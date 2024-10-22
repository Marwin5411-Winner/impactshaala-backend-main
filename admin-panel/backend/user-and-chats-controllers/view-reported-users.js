import ReportedChats from "../../../models/reported_chats/reported_chats.js";
import User from "../../../models/user/user.js";

async function viewReportedUsers(req,res){
    try{
        const getReportsUsers  = await ReportedChats.find();
        let senders=[];
        let receivers=[];

        for(let i=0;i<getReportsUsers.length;i++){
            const getAllSenderData = await User.findOne({authId:getReportsUsers[i].senderId}).populate({path:'authId' ,select:'email isActive isVerified'});
            const getAllRecipientData = await User.findOne({authId:getReportsUsers[i].receiverId}).populate({path:'authId' ,select:'email isActive isVerified'});
            if(getAllSenderData && getAllRecipientData) {
                senders.push(getAllSenderData);
                receivers.push(getAllRecipientData);
            }             
        }
        return res.render("chats/view-reported-user",{ currentPage: "chats", senders: senders,receivers:receivers });

    }catch(err){
        return res.json({status: "failure",err:err.message });
    }
}


export default viewReportedUsers;