import ejs from 'ejs';
import sendEmail from '../send-email.js';

// this helper function to send password reset link to user email
async function sendMailForPasswordReset({ email,resetPasswordTokenId }) {
  const frontEndUrl = process.env.frontEndUrl;
    ejs.renderFile(
        "utils/template/reset_password_link_template.ejs",
        {
          frontEndUrl:frontEndUrl,
          resetPasswordTokenId:resetPasswordTokenId
        },
        async (err, html) => {
          if (err) {
            console.error("Error rendering EJS template:", err);
            return { success: false, message: "Email not sent" };
          }

          const emailOptions = {
              from : `${process.env.EMAIL}`,
              to:email,
              subject:"Reset your password",
              html: html
          }
          // Send an Email to verify the user account
          const mail = await sendEmail(emailOptions);

          if (!mail) return { success: false, message: "Email not sent" };
        }
      );
  }

  export default sendMailForPasswordReset;