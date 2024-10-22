import Report from '../../../models/reported_posts/reported_posts.js'

async function listAllReportedMediaPosts(req,res,next){
    try{
        const reports = await Report.find({type: "MEDIA_POST"}).populate({path: "media_post_id", populate: {path: "userId", select: "name _id"}}).populate("userId")
        return res.render("reported-media-posts/reported-media-posts", {currentPage: "reported-media-posts", reports: reports.filter(item => item.media_post_id !== null)})
    }catch(err){
        return res.status(500).send({success:false,message:err.message});
    }
}

export default listAllReportedMediaPosts;