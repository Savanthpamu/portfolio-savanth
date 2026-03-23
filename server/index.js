import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Create transporter for nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    const transporter = createTransporter();

    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    };

    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Message:</h3>
            <p style="color: #6b7280;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>Best regards,<br>
          <strong>Savanth Pamu</strong><br>
          MERN Stack Developer</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Connect with me:<br>
              📧 Email: savanthpamu333@gmail.com<br>
              💼 LinkedIn: <a href="https://www.linkedin.com/in/savanthpamu/" style="color: #3b82f6;">linkedin.com/in/savanthpamu</a><br>
              🐙 GitHub: <a href="https://github.com/savanthpamu" style="color: #3b82f6;">github.com/savanthpamu</a>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToSender);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running!' });
});

export { app };

// Only start the server when run directly, not during tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}
