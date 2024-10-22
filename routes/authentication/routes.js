import express from "express";

const router = express();

// import createAccount from "../../controllers/authentication/create-account.js";
// router.post("/create-account", createAccount)

import listMstUserTypes from "../../controllers/authentication/list-mst-usertypes.js";
import createAccount from "../../controllers/authentication/create-account.js";
import loginToAccount from "../../controllers/authentication/login-to-account.js";
import isEmailAlreadyInUse from "../../controllers/authentication/is-email-taken.js";
import verifyAccount from "../../controllers/authentication/account-verify-token.js";
import requestPasswordReset from "../../controllers/authentication/request-password-reset-link.js";
import verifyResetPasswordToken from "../../controllers/authentication/verify-reset-password-token.js";
import setNewPasswordByResetToken from "../../controllers/authentication/set-newpassword-by-reset-token.js"
import changePassword from "../../controllers/authentication/change-password.js";
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";
import verify from "../../controllers/authentication/google-oauth/oauth-verify.js";
import oauthSignup from "../../controllers/authentication/google-oauth/oauth-signup.js";

router.get("/list-mst-user-types", listMstUserTypes);
router.post("/create-account", createAccount);
router.post("/is-email-taken",isEmailAlreadyInUse);
router.post("/login-to-account",loginToAccount);
router.post("/account-verify-token",verifyAccount);
router.post("/request-password-reset-link",requestPasswordReset);
router.post("/verify-reset-password-link",verifyResetPasswordToken);
router.post("/set-new-password-by-reset-token",setNewPasswordByResetToken);
router.post("/change-password",isUserAuthenticated,changePassword);
router.get("/oauth-verify",verify);
router.post("/oauth-signup", oauthSignup)

export default router;