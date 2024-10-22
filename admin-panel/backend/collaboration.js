import express from "express";

// middleware to check is user is logged in or not
import checkIsUserLoggedIn from "./admin-middleware/check-is-user-logged-in.js";

import listCollabKeywords from "./collab-controllers/list-collaborations-keywords.js";
import addNewCollabKeyword from "./collab-controllers/add-new-collab-tag.js";
import editCollabTags from "./collab-controllers/edit-collab-tag.js";
import deleteCollabTag from "./collab-controllers/delete-collab-tag.js";
const router = express.Router();


router.get("/collabs",checkIsUserLoggedIn, listCollabKeywords);
router.post("/add-new-collab-tag",checkIsUserLoggedIn,addNewCollabKeyword);
router.put("/edit-collab-tag",checkIsUserLoggedIn,editCollabTags);
router.delete("/delete-collab-tag",checkIsUserLoggedIn,deleteCollabTag);


export default router;