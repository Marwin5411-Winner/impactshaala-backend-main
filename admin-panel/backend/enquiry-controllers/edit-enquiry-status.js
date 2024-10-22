import Enquiry from "../../../models/enquires/enquires.js";

async function editEnquiryStatus(req,res,next){
    try{
        const {editId} = req.query;

        const {newStatus} = req.body;

        console.log(`Check : ${newStatus} ${editId}`);
        
        const enquires = await Enquiry.findByIdAndUpdate(editId,{status:newStatus},{new:true});
        console.log(`Enquiry Data: ${enquires}`);
        if(!enquires){
            return res.status(400).send({success:false,message:"Couldn't not update the enquiry status"})
        }
        return res.status(200).send({success:true,message:"Updated status successfully"});
    }catch(err){
        return res.status(500).send({success:false,message:err.message});
    }
}

export default editEnquiryStatus;