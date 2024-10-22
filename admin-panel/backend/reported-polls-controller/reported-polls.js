import Report from '../../../models/reported_posts/reported_posts.js'

async function listAllReportedPolls(req,res,next){
    try{
        const reports = await Report.find({type: "POLL"}).populate({path: "polls_id", populate: {path: "userId", select: "name _id"}}).populate({path: "userId", select: "name _id"}).lean()
        console.log(reports)
        return res.render("reported-polls/reported-polls", {currentPage: "reported-polls", reports: reports.filter(item => item.polls_id !== null)})
    }catch(err){
        return res.status(500).send({success:false,message:err.message});
    }
}

export default listAllReportedPolls;