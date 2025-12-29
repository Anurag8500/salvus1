import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your SALVUS account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0d9488;">Welcome to SALVUS</h1>
        <p>Please verify your email address to complete your registration.</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 16px;">Verify Email</a>
        <p style="margin-top: 24px; font-size: 14px; color: #666;">Or copy and paste this link in your browser:</p>
        <p style="font-size: 12px; color: #666;">${verificationUrl}</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Verification email sent to ' + email)
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw new Error('Could not send verification email')
  }
}
