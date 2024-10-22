// import User from '../../models/user/user.js';

// async function updateOnlineStatus(req,res,next){
//     // i will be storing time when user is logged in by using is-user-authenticated middleware.
//     const userLoggedInTime = req.timestamp;
//     // also get user id from is-user-authenticated middleware
//     const userId = req.user
//     try{
//         // const timeStamps = new Date(userLoggedInTime * 1000);
//         // const date1String = timeStamps.toUTCString();

//         // const newDate = new Date();
//         // console.log(`New Date : ${newDate}`);
//         // // Get the UTC representation of the current date
//         // const date2String = newDate.toUTCString();

//         // // Parse the date strings into Date objects
//         // const date1 = new Date(date1String);
//         // const date2 = new Date(date2String);

//         // // Calculate the difference in milliseconds
//         // const differenceMilliseconds = Math.abs(date1 - date2);

//         // // Convert milliseconds to minutes
//         // const differenceMinutes = Math.floor(differenceMilliseconds / (1000 * 60));

//         // console.log(`The difference between the two dates is approximately ${differenceMinutes} minutes.`);

//         const timeStamps = new Date(userLoggedInTime * 1000);
//         const dateString = timeStamps.toUTCString();

//         let setUserLoggedInTime = new Date(dateString);
//         console.log(`Current time : ${setUserLoggedInTime}`);
//         const userProfile =await User.findOneAndUpdate({authId:userId},{lastSeen:setUserLoggedInTime},{new:true});

//         console.log(`Success: ${userProfile}`);
//     }catch(err){
//         return res.status(500).json({success:false,message:err.message});
//     }
// }


// export default updateOnlineStatus;