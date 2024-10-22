//check if the user is logged in or not

async function checkIsUserLoggedIn(req,res,next){
    console.log(`Check inside middleware: ${req.session.login_status}`);
    if(req.session.login_status!==true){
        return res.redirect("/admin-panel/authentication/login");
    }
    next();
}


export default checkIsUserLoggedIn;