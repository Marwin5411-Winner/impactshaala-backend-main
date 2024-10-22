import express from "express";
const router = express();

import listStatesAndDistricts from "../../controllers/geolocation/list-indian-states-districts.js";

router.get('/list-states-and-districts',listStatesAndDistricts);

export default router;