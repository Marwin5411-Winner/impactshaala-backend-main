// import express from "express";
import dotenv from "dotenv";
import {
    StatusCodes
} from "http-status-codes";
import express, {
    response
} from "express";
import multer from "multer";

import AdminSchema from "../../models/auth/admin-authenication.js";
import checkIsUserLoggedIn from "../backend/admin-middleware/check-is-user-logged-in.js"

dotenv.config();

const router = express.Router();
const upload = multer();


router.get("/login", async (req, res) => {
    console.log(`check before login status : ${req.session.login_status}`);
    if(req.session.login_status===true){
        return res.redirect("/admin-panel/dashboard/dashboard");
    }
    res.render("login", {
        alert: ""
    });
});



router.post("/login", async (req, res) => {
    // Redirect to dashboard
    let email = req.body.emailId;
    let password = req.body.password;

    console.log(email);
    console.log(password);

    email = email.toLowerCase();
    password = password.toLowerCase();

    console.log(email);
    console.log(password);

    let adminCreds = await AdminSchema.find({email:email});

    console.log(adminCreds)

    if (adminCreds.length > 0) {
        // User exist
        adminCreds = adminCreds[0]
        if (adminCreds.password === password) {
            // User is logged in
            req.session.login_status = true;
            console.log(`login status : ${req.session.login_status}`);
            return res.send({
                "msg": "Successfully logged in",
                "status": true
            })

        } else {
            // User entered wrong password
            return res.send({
                "msg": "Wrong login details",
                "status": false
            })
        }
    } else {
        // User doesn't exist
        return res.send({
            "msg": "User doesn't exist",
            "status": false
        })
    }

});

router.get("/logout",checkIsUserLoggedIn, async (req, res) => {
    req.session.login_status = false;
    console.log(`check after logged ---> login status : ${req.session.login_status}`);
    res.redirect("/admin-panel/authentication/login");
  });

export default router;