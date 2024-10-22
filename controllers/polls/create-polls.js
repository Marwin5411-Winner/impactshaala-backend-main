import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";
import {pollsDuration} from "../../consts/userenums.js";
import mongoose from "mongoose";

async function createPoll(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const userProfile = await User.findOne({authId:userId});

        if(!userProfile){
            return res.status(404).json({success:false,message:"User not found."});
        }

        let {question,text,caption,keywords,duration} = req.body;

        if(!question || !duration){
            return res.status(400).json({success:false,message:"Please provide required fields."});
        }

        let pollDuration;
        const todayDate = new Date();

        if(duration===pollsDuration.duration[0]){
            pollDuration = addDays(todayDate, 1);
        }else if(duration===pollsDuration.duration[1]){
            pollDuration = addDays(todayDate, 3);
        }else if(duration===pollsDuration.duration[2]){
            pollDuration = addDays(todayDate, 7);
        }else{
            pollDuration = addDays(todayDate, 14);
        }

        const polls = await Polls.create({
            userId:userProfile._id,
            keywords:keywords.map(keyword => (new mongoose.Types.ObjectId(keyword))),
            question:question,
            caption:caption,
            duration:pollDuration,
            options: text ? text.map(option => ({ text: option })) : []
        });


        if(!polls){
            return res.status(400).json({success:false,message:"Couldn't create polls."});
        }

        return res.status(200).json({success:true,message:"Successfully created polls.",data:polls});

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}

export default createPoll;