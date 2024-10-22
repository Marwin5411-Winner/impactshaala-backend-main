import User from "../../../models/user/user.js";

async function getUserList(req, res,next) {
    try {
        let userLists = await User.find().populate({ path: 'authId', select: 'email isActive isVerified'});
        res.render("users/user-list", { currentPage: "users", userLists: userLists });
        next();
    } catch (error) {
        console.error("Error rendering user list:", error);
        return res.status(500).send("Internal Server Error");
    }
}

export default getUserList;