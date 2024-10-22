import ejs from 'ejs';
import sendEmail from '../send-email.js';

// Helper function to send a general notification email
async function sendNotificationEmail({ email, userName, notificationType, notificationMessage, actionLink }) {
  console.log(`Starting to send a notification email`);

  // Define the front-end URL for action links
  const frontEndUrl = process.env.frontEndUrl || 'https://impactshaala.com';

  ejs.renderFile(
    "utils/template/notification_email_template.ejs", // Path to your EJS template
    {
      frontEndUrl: frontEndUrl,
      userName: userName,
      notificationType: notificationType,
      notificationMessage: notificationMessage,
      actionLink: actionLink || frontEndUrl // Fallback to the main site if no action link
    },
    async (err, html) => {
      if (err) {
        console.error("Error rendering EJS template:", err);
        return { success: false, message: "Email not sent" };
      }

      const emailOptions = {
        from: `${process.env.EMAIL}`, // The sender's email from environment variables
        to: email, // The recipient’s email
        subject: `New Notification: ${notificationType}`, // Subject of the email
        html: html // The generated HTML content from the EJS template
      };

      // Send the email using the sendEmail function
      const mail = await sendEmail(emailOptions);

      if (!mail) {
        console.error("Email failed to send");
        return { success: false, message: "Email not sent" };
      }

      console.log("Email sent successfully");
      return { success: true, message: "Email sent successfully" };
    }
  );
}

export default sendNotificationEmail;
