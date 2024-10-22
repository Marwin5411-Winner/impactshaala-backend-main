import { OAuth2Client } from 'google-auth-library';
import Authentication from '../../../models/auth/authenication.js';
import User from "../../../models/user/user.js";
import generateVerifyToken from "../../../utils/encryptionhelper.js";
import SENDMAIL from "../../../utils/helper/email_verification_helper.js"
import bcrypt from 'bcryptjs';

const client = new OAuth2Client();

const oauthSignup = async (req, res, next) => {
	try {
		let token = req.headers.authorization;

		let {
		accountType,
		userType1,
		userType2,
		comEmail,
		address,
		city,
		district,
		state,
		country,
		pinCode,
		profilePic } = req.body;

		// checking this fields for  undefined or which are empty
		const newUserType3 = req.body.userType3 || '';
		const newUserType4 = req.body.userType4 || '';
		const newUserType5 = req.body.userType5 || '';
		const newCountryCode = req.body.countryCode || '+91';
		const newTagline = req.body.tagline || '';
		const newDescription = req.body.description || '';
		const newWebsite = req.body.website || '';
		const newContactNo = req.body.contactNo || '';
		profilePic = profilePic || '';
		pinCode = pinCode || '';
		comEmail=comEmail || '';
		address=address || '';
		city=city || '';
		district=district || '';
		state=state || '';
		country=country || '';
		pinCode=pinCode || '';

		if(!accountType||
			!userType1){
			return res.status(400).json({message:"Please provide required fields"});
		}

		console.log("Client Id: ", process.env.CLIENT_ID)

		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});
		let payload = ticket.getPayload();
		const userid = payload['sub'];
		const email = payload.email;
		const name = payload.name;
		let password = name;
		console.log(JSON.stringify(payload))

		let auth = await Authentication.findOne({ email: email });

		if (auth) {
			return res.status(400).json({ message: "We have already an account with this email. Kindly use different email." });
		}

		let hashedPassword;

		if(password.trim()!==''){
				hashedPassword = await bcrypt.hash(password.trim(), 10);
		} else{
				return res.status(400).json({success: false,message: "Password field cannot contain only empty spaces"});
		}

		// Save the user details to the database
		const newUser = new Authentication({
			email: email.trim(),
			password: hashedPassword
		});
		await newUser.save();

		let userId = newUser.id;

		const createVerifyToken = generateVerifyToken(userId,Date.now(),'10m');

		const profile = await User.create({
				authId : newUser.id,
				accountType:accountType.trim(),
				userType1 : userType1.trim(),
				userType2 : userType2.trim(),
				userType3 : newUserType3,
				userType4 : newUserType4,
				userType5 : newUserType5,
				name : name.trim(),
				collabKeywords: [],		
				tagline :newTagline,
				description : newDescription,
				website : newWebsite,
				countryCode :newCountryCode,
				contactNo : newContactNo,
				comEmail : comEmail.trim(),
				address : address.trim(),
				city : city.trim(),
				district : district.trim(),
				state : state.trim(),
				country : country.trim(),
				pinCode : pinCode.trim(),
		});

		if(profilePic!==''){
		// uploading user profile pic
		profilePic = profilePic.replace(
				/^data:image\/\w+;base64,/,
				""
			);
			const buffer = Buffer.from(profilePic, "base64");
			const extension = imageExtension(
				buffer
			);
			let image = await s3_buffer_upload(
				buffer,
				`impactshaala`,
				`${profile._id}.${extension}`
			);
			profile.profilePic = image;
			await profile.save()
		}

		// Send an Email to verify the user account
		await SENDMAIL({email:email, name:name.trim(), verifyTokenID:createVerifyToken});

		return res.status(200).json({
			success:true,
			message: "Your account has been created successfully. We have sent an email to your account. Please verify."
		});

	} 
	catch (err) {
		return res.status(500).json({
			success:false,
			message: `Error while creating user : ${err.message}` });
	}
}

export default oauthSignup;