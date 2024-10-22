import Accomplishment from "../../../models/accomplishments/accomplishments.js";
import Authentication from "../../../models/auth/authenication.js";
import User from "../../../models/user/user.js";
import sendNotificationEmail from "../../../utils/helper/emailNotification.js";
import createNotification from "../../../utils/notification/sendGeneralNotification.js";


const approveAccomplishment = async (req, res) => {
  try {
    const accomplishments = await Accomplishment.findOne({
      _id: req.params.id,
    });
    if (accomplishments.approvalStatus === "APPLIED") {
      const updated = await Accomplishment.findOneAndUpdate(
        { _id: req.params.id },
        { approvalStatus: "APPROVED" },
        { new: true }
      );
      return res.json({
        success: true,
        message: "Achievement Approved Successfully!!",
      });
    }

	const user = await User.findById(accomplishments.userId);

	const auth = await Authentication.findById(user.authId);

    await createNotification(
      user._id,
      "You Accomplishments has Approved By Admin",
      "OTHER"
    );

    await sendNotificationEmail({
      email: auth.email,
      userName: user.name,
      notificationType: "MESSAGE",
      notificationMessage: "Someone has sent message to you",
      actionLink: "https://impactshaala.com/",
    });
    return res
      .status(400)
      .json({
        success: false,
        message: "Achievement already approved or rejected!!",
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export default approveAccomplishment;
