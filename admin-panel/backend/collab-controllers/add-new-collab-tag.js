import CollaborationKeywords from "../../../models/collabs/collabs.js";

async function addNewCollabKeyword(req,res,next){
    try{
        const newCollabTag = req.body.collabTag;

        if(newCollabTag===''){
            return res.status(400).send({success:false,message:"Collab Tags cannot be empty"});
        }

        const existing = await CollaborationKeywords.findOne({collabTag: newCollabTag})
        if(existing) return res.status(400).send({success: false, message: "Collab Tag already exists"})

        const collabKeywords = await CollaborationKeywords({collabTag:newCollabTag});
        const saved = await collabKeywords.save()
        if(!saved) res.status(500).send({success: false, message: "There was some error while saving the collaboration tag"})

        console.log(`Collab Tags : ${collabKeywords}`);

        return res.status(200).send({success:true,message:"Successfully added new collab keyword"});
    }catch(err){
        return res.status(500).send({success:false,message:"Error while adding new collab keyword: " + err.message});
    }
}

export default addNewCollabKeyword;