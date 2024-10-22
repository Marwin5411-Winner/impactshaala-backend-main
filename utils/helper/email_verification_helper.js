import ejs from 'ejs';
import sendEmail from '../send-email.js';

// this helper function to send verification email
async function SENDMAIL({email,name,verifyTokenID }) {
  console.log(`got inside of 1st step`);
    const frontEndUrl = process.env.frontEndUrl;

    ejs.renderFile(
      //"utils/template/test.ejs",
      "utils/template/email_verify_template.ejs",
        {
            frontEndUrl:frontEndUrl,
            verifyAccTokenId:verifyTokenID,
            username:name
        },
        async (err, html) => {
          if (err) {
            console.error("Error rendering EJS template:", err);
            return { success: false, message: "Email not sent" };
          }

          const emailOptions = {
              from : `${process.env.EMAIL}`,
              to:email,
              subject:"Please Verify your Email",
              html: html
          }
          // Send an Email to verify the user account
          const mail = await sendEmail(emailOptions);
  
          if (!mail) return { success: false, message: "Email not sent" };
        }
      );
  }

  export default SENDMAIL;