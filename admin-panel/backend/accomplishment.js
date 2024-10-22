import express from 'express';
import checkIsUserLoggedIn from "../backend/admin-middleware/check-is-user-logged-in.js";
import listAllAccomplishments from './accomplishment-middleware/list-all-accomplishments.js';
import viewAccomplishment from './accomplishment-middleware/view-accomplishment.js';
import approveAccomplishment from './accomplishment-middleware/approve-accomplishment.js';
import rejectAccomplishment from './accomplishment-middleware/reject-accomplishment.js';
import deleteAccomplishment from './accomplishment-middleware/delete-accomplishment.js';

const router = express.Router()

router.get("/list-all-accomplishments", checkIsUserLoggedIn, listAllAccomplishments)
router.get("/view-accomplishment/:id", checkIsUserLoggedIn, viewAccomplishment);
router.get("/approve-accomplishment/:id", checkIsUserLoggedIn, approveAccomplishment);
router.get('/reject-accomplishment/:id', checkIsUserLoggedIn, rejectAccomplishment);
router.delete("/delete/:id", checkIsUserLoggedIn, deleteAccomplishment);

export default router;