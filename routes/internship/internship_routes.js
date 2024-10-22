import express from "express";

const router = express();

// middleware to check is user authenticated or not
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";

import createPosting from "../../controllers/internship/create-job-or-internship-posting.js";
import listMyJobOrInternshipPosting from "../../controllers/internship/list-my-job-or-internship-posting.js";
import deleteMyJobOrInternship from "../../controllers/internship/delete-my-job-or-internship.js";
import updateMyJobOrInternship from "../../controllers/internship/update-my-job-or-internship.js";
import searchJobsOrInternship from "../../controllers/internship/search-jobs-or-internship.js";
import applyToJobOrInternship from "../../controllers/internship/apply-job-or-internship.js";
import listAllApplicants from "../../controllers/internship/list-all-applicants.js";

router.post('/job-or-internship-posting/create',isUserAuthenticated,createPosting);
router.post('/jobs-or-internship-posting/list',isUserAuthenticated,listMyJobOrInternshipPosting);
router.delete('/jobs-or-internship-posting/delete',isUserAuthenticated,deleteMyJobOrInternship);
router.put('/jobs-or-internship-posting/update',isUserAuthenticated,updateMyJobOrInternship);
router.get('/job-or-internship-posting/search',isUserAuthenticated,searchJobsOrInternship);

router.post('/job-or-internship-posting/apply',isUserAuthenticated,applyToJobOrInternship);
router.get('/job-or-internship-posting/list-applicants',isUserAuthenticated,listAllApplicants);



export default router;