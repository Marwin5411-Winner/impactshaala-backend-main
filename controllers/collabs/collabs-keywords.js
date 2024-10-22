import CollaborationKeywords from "../../models/collabs/collabs.js";

async function collabKeywords(req,res,next){
    try{
        const listCollabKeywords = await CollaborationKeywords.find();
        return res.status(200).json({
            success:true,
            data:listCollabKeywords,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

export default collabKeywords;