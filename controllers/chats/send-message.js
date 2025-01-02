import Authentication from "../../models/auth/authenication.js";
import Chat from "../../models/chats/chats.js";
import sendNotificationEmail from "../../utils/helper/emailNotification.js";
import createNotification from "../../utils/notification/sendGeneralNotification.js";
import { s3_buffer_upload, s3_upload } from "../../utils/s3_bucket.js";

const sendMessage = async (req, res) => {
  // Using authId for all these not user id
  const userId = req.user.id;

  console.log(userId.toString(), req.body);

  if (userId !== req.body.senderId)
    return res
      .status(401)
      .json({
        success: false,
        message: "User not authorised to send this message",
      });

  const { senderId, receiverId, message, attachment, extension } = req.body;
  let savedAttachment = "";

  if (attachment) {
    if (!attachment.startsWith("https://")) {
      savedAttachment = attachment.replace(
        /^data:\w+\/[a-zA-Z+\-.]+;base64,/,
        ""
      );
      savedAttachment = savedAttachment.replace("data:video/mp4;base64,", "");
      try {
        const buffer = Buffer.from(savedAttachment, "base64");
        savedAttachment = await s3_buffer_upload(
          buffer,
          `impactshaala`,
          `${senderId}_${Date.now()}.${extension}`
        );
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Could not save the attachment",
        });
        return;
      }
    } else savedAttachment = attachment;
  }

  const chat = new Chat({
    senderId,
    receiverId,
    encryptedContent: message,
    attachment: savedAttachment,
  });
  chat
    .save()
    .then(async (data) => {
      await createNotification(receiverId, "Someone has sent message to you", "MESSAGE");
      return res.json({
        success: true,
        message: "Message sent successfully",
        data,
      });

	  const receiver = await Authentication.findByID(receiverId);

	  

	  await sendNotificationEmail({
		email: receiver.email,
		userName: user.name,
		notificationType: "MESSAGE",
		notificationMessage: "Someone has sent message to you",
		actionLink: "https://impactshaala.com/",
	  });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Couldn't send chat",
      });
    });
};

export default sendMessage;
