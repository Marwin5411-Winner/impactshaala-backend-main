import CollaborationKeywords from "../../../models/collabs/collabs.js";

async function listCollabKeywords(req,res,next){
    try{
     
        const listCollabKeywords = await CollaborationKeywords.find();
        return res.render("collabs/collabs", {currentPage: "collabs",collabKeywords: listCollabKeywords});
    }catch(err){
        return res.status(500).send({success:false,});
    }
}

export default listCollabKeywords;