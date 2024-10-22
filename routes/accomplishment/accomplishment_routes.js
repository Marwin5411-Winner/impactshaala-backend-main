import express from "express";
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";
import createAccomplishment from "../../controllers/accomplishments/create-accomplishment.js";
import getMyAccomplishments from "../../controllers/accomplishments/get-my-accomplishments.js";
import getProfileAccomplishments from "../../controllers/accomplishments/get-profile-accomplishments.js";

const router = express();

router.post("/create", isUserAuthenticated, createAccomplishment);
router.get("/get-my-accomplishments", isUserAuthenticated, getMyAccomplishments);
router.get("/get-profile-accomplishments/:id", isUserAuthenticated, getProfileAccomplishments);

export default router;