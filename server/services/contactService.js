import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendContactMessage = async (contactData) => {
  const { name, email, phone, comment } = contactData;

  const mailOptions = {
    from: email || 'no-reply@dotodo.com',
    to: process.env.SUPPORT_EMAIL || 'support@dotodo.com',
    subject: "Incoming Contact Message",
    html: `
      <p>You have received a new message from <strong>${name}</strong>.</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Comment:</strong></p>
      <p>${comment}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
