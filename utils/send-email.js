import { createTransport } from 'nodemailer';

const transporter = createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });



const sendEmail = async(mailOptions) => {

  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error("Error Email: " + e);
  }
    
}

export default sendEmail;