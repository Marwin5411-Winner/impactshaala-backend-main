import express from "express";

const router = express();

import addEnquiry from "../../controllers/enquries/add-enquires.js";

router.post('/add-enquiry',addEnquiry);

export default router;