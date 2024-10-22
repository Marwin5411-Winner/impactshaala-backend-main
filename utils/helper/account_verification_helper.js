import ejs from 'ejs';
import sendEmail from '../send-email.js';

// this helper function to send confirmation that user email is verified
async function SENDMAIL({email}) {
    ejs.renderFile(
        "utils/template/account_verification_template.ejs",
        async (err, html) => {
          if (err) {
            console.error("Error rendering EJS template:", err);
            return { success: false, message: "Email not sent" };
          }

          const emailOptions = {
              from : `${process.env.EMAIL}`,
              to:email,
              subject:"Your Account is verified successfully",
              html: html
          }
          // Send an Email to verify the user account
          const mail = await sendEmail(emailOptions);
  
          if (!mail) return { success: false, message: "Email not sent" };
        }
      );
  }

  export default SENDMAIL;