import express from "express";
import checkIsUserLoggedIn from "./admin-middleware/check-is-user-logged-in.js";
const router = express.Router();


router.get("/dashboard",checkIsUserLoggedIn, async function (req, res) {
		return res.render("dashboard/dashboard", {currentPage: "dashboard"});
});

export default router;