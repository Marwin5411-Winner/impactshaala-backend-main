import express from "express";
import checkIsUserLoggedIn from "./admin-middleware/check-is-user-logged-in.js";
const router = express.Router();

import listAllEnquires from "../backend/enquiry-controllers/list-all-enquires.js";
import editEnquiryStatus from "../backend/enquiry-controllers/edit-enquiry-status.js";

router.get('/list-all-enquires',checkIsUserLoggedIn,listAllEnquires);
router.post('/edit-enquiry-status',checkIsUserLoggedIn,editEnquiryStatus);

export default router;