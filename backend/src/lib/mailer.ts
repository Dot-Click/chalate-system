import nodemailer from 'nodemailer';
import { env } from '@/config/env';

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST || 'smtp.gmail.com',
  port: env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

// Verify transporter connection
transporter.verify((error: any, _success: any) => {
  if (error) {
    console.error('SMTP transporter connection failed:', error);
  } else {
    console.log('SMTP transporter is ready to send emails');
  }
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Send email function
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const mailOptions = {
      from: `"${env.APP_NAME || 'Chalet System'}" <${env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Send reset password email
export const sendResetPasswordEmail = async (email: string, resetToken: string): Promise<void> => {
  const resetUrl = `${env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
      <p style="color: #666; line-height: 1.6;">
        Hello,
      </p>
      <p style="color: #666; line-height: 1.6;">
        You requested a password reset for your account. Click the link below to reset your password:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 30px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="color: #666; line-height: 1.6;">
        If you didn't request this password reset, please ignore this email.
      </p>
      <p style="color: #666; line-height: 1.6;">
        This link will expire in 1 hour for security reasons.
      </p>
      <hr style="border: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Password Reset Request',
    html,
  });
};
