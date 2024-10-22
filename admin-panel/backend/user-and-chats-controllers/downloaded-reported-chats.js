import Chat from "../../../models/chats/chats.js";

async function downloadedReportedChats(req,res){
    console.log(`Something`)
    try{
    console.log(`Something 2`)

        const {senderId} = req.query;
        const {receiverId} = req.query;
        const {senderName} = req.body;
        const {receiverName} = req.body;

        const chats = await Chat.find({senderId:senderId,receiverId:receiverId});

        let formattedChats ='';

        chats.forEach(chat =>{
            formattedChats += `Date and Time: ${new Date(`${chat.createdAt}`).toLocaleString("en-IN", {timeZone: 'Asia/Kolkata'})}\n`;
            formattedChats += `Sender Name: ${senderName}\n`;
            formattedChats += `Receiver Name: ${receiverName}\n`;
            formattedChats += `message: ${chat.encryptedContent}\n`;
            formattedChats += `attachment : ${chat.attachment}\n\n`;
        });

        res.attachment(`${senderName}_${receiverName}.txt`);
        res.type('txt');
        return res.status(200).send(formattedChats);;
    }catch(err){
        console.log(`Error downloading: ${err.message}`);
        return res.status(500).send({success: false,message: err.message});
    }
}

export default downloadedReportedChats;