import express from "express";



import { searchProfile } from "../../controllers/search/search_user.js";
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";


const router = express();



router.get('/', isUserAuthenticated, searchProfile);



export default router;