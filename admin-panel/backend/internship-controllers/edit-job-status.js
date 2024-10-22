import Internship from "../../../models/internship/internship.js";

async function editJobStatus(req,res,next){
    try{
        const {editId} = req.query;

        const {newStatus} = req.body;

        console.log(`Check : ${newStatus} ${editId}`);
        
        const jobStatus = await Internship.findByIdAndUpdate(editId,{status:newStatus},{new:true});
        
        if(!jobStatus){
            return res.status(400).send({success:false,message:"Couldn't update the job status"})
        }
        return res.status(200).send({success:true,message:"Updated status successfully"});
    }catch(err){
        return res.status(500).send({success:false,message:err.message});
    }
}

export default editJobStatus;