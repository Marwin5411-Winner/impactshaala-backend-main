import express from "express";
const router = express.Router();
// middleware to check is user is logged in or not
import checkIsUserLoggedIn from "./admin-middleware/check-is-user-logged-in.js";

import listAllApplicants from "./internship-controllers/list-all-applicants.js";
import downloadApplicantsPdf from "./internship-controllers/download-applicants-resume.js";
import listAllJobsOrInternships from "./internship-controllers/list-all-jobs-or-internship.js";
import editJobStatus from "./internship-controllers/edit-job-status.js";
import deletePostByAdmin from "./internship-controllers/delete-post-by-admin.js";
import deleteApplicantsByAdmin from "./internship-controllers/delete-applicants-by-admin.js";
import editApplicantJobStatus from "./internship-controllers/edit-applicants-job-status.js";
import updateApplicantStatus from "./internship-controllers/update-applicant-status.js";


router.get('/internships',checkIsUserLoggedIn,listAllApplicants);
router.put('/update-applicant-status/:id', checkIsUserLoggedIn, updateApplicantStatus)
router.post('/download-applicants-resume',checkIsUserLoggedIn,downloadApplicantsPdf);
router.get('/list-all-jobs-or-internship',checkIsUserLoggedIn,listAllJobsOrInternships);
router.post('/update-job-status',checkIsUserLoggedIn,editJobStatus);
router.post('/delete-post-by-admin',checkIsUserLoggedIn,deletePostByAdmin);
router.post('/delete-applicant-by-admin',checkIsUserLoggedIn,deleteApplicantsByAdmin);
router.post('/update-applicant-job-status-by-admin',checkIsUserLoggedIn,editApplicantJobStatus);


export default router;