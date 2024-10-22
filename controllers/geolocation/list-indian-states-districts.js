import {statesAndDistricts} from "../../utils/indian-states-districts.js";


async function listStatesAndDistricts(req, res, next) {
    try{
        const data = statesAndDistricts;
        return res.status(200).json({success:true,data:data});
    }catch(err){
        return res.status(500).json({success: false,message: err.message});
    }
}

export default listStatesAndDistricts;