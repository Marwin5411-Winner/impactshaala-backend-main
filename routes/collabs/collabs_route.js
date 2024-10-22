import express from "express";
const router = express();

import collabKeywords from "../../controllers/collabs/collabs-keywords.js";

router.get('/collab-keywords',collabKeywords);

export default router;