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
    await transporter.sendMail(mailOptions);
}

export default sendEmail;