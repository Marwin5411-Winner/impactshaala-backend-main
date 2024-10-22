import Applicants from "../../../models/applicants/applicants.js";

async function editApplicantJobStatus(req,res,next){
    try{
        const {editId} = req.query;

        const {newStatus} = req.body;

        console.log(`Check : ${newStatus} ${editId}`);
        
        const jobStatus = await Applicants.findByIdAndUpdate(editId,{status:newStatus},{new:true});
        
        if(!jobStatus){
            return res.status(400).send({success:false,message:"Couldn't not update the applicant status"})
        }
        return res.status(200).send({success:true,message:"Updated status successfully"});
    }catch(err){
        return res.status(500).send({success:false,message:err.message});
    }
}

export default editApplicantJobStatus;