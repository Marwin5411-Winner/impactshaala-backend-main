import CollaborationKeywords from "../../../models/collabs/collabs.js";

async function editCollabTags(req,res,next){
    try{
        const {uid} = req.query;
        const newCollabTag = req.body.collabTag;

        const collabKeywords = await CollaborationKeywords.findByIdAndUpdate(uid,{
            collabTag:newCollabTag
        },{new:true});

        return res.status(200).send({success:true,message:"Successfully added new collab keyword"});
    }catch(err){
        return res.status(500).send({success:false,message:"Error while adding new collab keyword"});
    }
}

export default editCollabTags;