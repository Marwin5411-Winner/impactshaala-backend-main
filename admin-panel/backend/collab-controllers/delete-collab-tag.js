import CollaborationKeywords from "../../../models/collabs/collabs.js";

async function deleteCollabTag(req,res,next){
    try{
        const {uid} = req.query;
        const newCollabTag = req.body.collabTag;

        const collabKeywords = await CollaborationKeywords.findByIdAndDelete(uid,{
            collabTag:newCollabTag
        });


        return res.status(200).send({success:true,message:"Successfully deleted  collab keyword"});
    }catch(err){
        return res.status(500).send({success:false,message:"Error while deleting  collab keyword"});
    }
}

export default deleteCollabTag;