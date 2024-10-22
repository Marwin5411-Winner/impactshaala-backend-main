import express from "express";
import getNotifications from "../../controllers/notifications/get-notifications.js";
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";


const router = express();

router.get('/', isUserAuthenticated, getNotifications);


export default router