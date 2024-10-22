import Enquiry from "../../../models/enquires/enquires.js";
import {enquiriesStatus} from "../../../consts/userenums.js";
let enquiryStatus = enquiriesStatus.status;


async function listAllEnquires(req,res,next){
    try{
        const enquires = await Enquiry.find();
        console.log(`Enquiry : ${enquires}`);
        return res.render("enquiry/enquiry",{currentPage:"enquiry",enquires:enquires,enquiryStatus:enquiryStatus});
    }catch(err){
        return res.status(500).send({success:false,message:err.message});
    }
}

export default listAllEnquires;