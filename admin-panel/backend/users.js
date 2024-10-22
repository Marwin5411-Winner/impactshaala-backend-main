import express from "express";
import getUserList from "../backend/user-and-chats-controllers/get-user-list.js"
import showUserDetails from "../backend/user-and-chats-controllers/show-user-details.js"
import {changeUserStatus,changeVerificationStatus} from "../backend/user-and-chats-controllers/change-user-status.js"
import deleteUserByAdmin from "../backend/user-and-chats-controllers/delete-user-by-admin.js"
import changeUserPassword from "../backend/user-and-chats-controllers/change-user-password.js"
import checkIsUserLoggedIn from "../backend/admin-middleware/check-is-user-logged-in.js";

const router = express.Router();

router.get("/users-list", checkIsUserLoggedIn,getUserList);

router.get("/user-details",checkIsUserLoggedIn,showUserDetails);

// here we will be changing the user active status
router.post("/change-user-active-status",checkIsUserLoggedIn,changeUserStatus);

// here we will be changing the user verified status
router.post("/change-user-verification-status",checkIsUserLoggedIn,changeVerificationStatus);

router.post("/change-user-password",checkIsUserLoggedIn,changeUserPassword);

router.post("/delete-user-by-admin",checkIsUserLoggedIn,deleteUserByAdmin);

export default router;