import express from "express";

const router = express();

// middleware to check is user authenticated or not
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";

import addAdmin from "../../controllers/manage-admins/add-admin.js";
import listAdmins from "../../controllers/manage-admins/list-admin.js";
import updateAdmin from "../../controllers/manage-admins/update-admin.js";
import deleteAdmin from "../../controllers/manage-admins/delete-admin.js";
import disableAdmins from "../../controllers/manage-admins/disable-admins.js";
import enableAdmins from "../../controllers/manage-admins/enable-admins.js";


router.post('/add',isUserAuthenticated,addAdmin);
router.get('/list',isUserAuthenticated,listAdmins);
router.put('/update',isUserAuthenticated,updateAdmin);
router.delete('/delete/:deleteId',isUserAuthenticated,deleteAdmin);
router.post('/disable/:disableId',isUserAuthenticated,disableAdmins);
router.post('/enable/:enableId',isUserAuthenticated,enableAdmins);


export default router;