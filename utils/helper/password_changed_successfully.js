import ejs from 'ejs';
import sendEmail from '../send-email.js';

// this helper function to send verification to email that user password reset was successful
async function passwordChangedSuccessfully({email}) {
    ejs.renderFile(
        "utils/template/password_changed_successfully_template.ejs",
        async (err, html) => {
          if (err) {
            console.error("Error rendering EJS template:", err);
            return { success: false, message: "Email not sent" };
          }

          const emailOptions = {
              from : `${process.env.EMAIL}`,
              to:email,
              subject:"Password Changed Successfully",
              html: html
          }
          // Send an Email to verify the user account
          const mail = await sendEmail(emailOptions);
  
          if (!mail) return { success: false, message: "Email not sent" };
        }
      );
  }

  export default passwordChangedSuccessfully;