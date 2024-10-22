import Enquiry from "../../models/enquires/enquires.js";


async function addEnquiry(req, res, next) {
    try{
        const {name,email,subject,message} = req.body;

        if(!name||!email||!subject||!message){
            return res.status(400).send({message:"Please provide required fields."});
        }

        if(email!==''){
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // Check if the email is in a valid format
            if (!emailRegex.test(email)) {
                return res.status(400).send({success: false,message:"Invalid Email format"});
            }

            // Check if "@" is the only special character
            if ((email.match(/@/g) || []).length !== 1) {
                return res.status(400).send({success: false,message:"Invalid Email format"});
            }
        }

        const enquires = await Enquiry.create({name:name,email:email,subject:subject,message:message});
        if(!enquires){
            return res.status(400).send({message:"Couldn't send enquiry, something went wrong."});
        }
        return res.status(200).send({success:true,message:"Enquiry sent successfully"});
    }catch(err){
        return res.status(500).send({success: false,message: err.message});
    }
}

export default addEnquiry;