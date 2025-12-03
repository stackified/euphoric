import pool from '../config/database.js'
import nodemailer from 'nodemailer'

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Create enquiry
export const createEnquiry = async (req, res) => {
  try {
    // Validation handled by middleware
    const { name, phone, email, message } = req.body

    // Additional sanitization
    const sanitizedName = name.trim().substring(0, 100)
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 255)
    const sanitizedPhone = phone ? phone.trim().replace(/[^0-9+\-() ]/g, '').substring(0, 20) : null
    const sanitizedMessage = message.trim().substring(0, 2000)

    // Save to database using prepared statements
    const [result] = await pool.execute(
      'INSERT INTO enquiries (name, phone, email, message) VALUES (?, ?, ?, ?)',
      [sanitizedName, sanitizedPhone, sanitizedEmail, sanitizedMessage]
    )

    // Send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter()
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'euphoricparth1003@gmail.com',
          subject: `New Enquiry from ${name}`,
          html: `
            <h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Phone:</strong> ${sanitizedPhone || 'Not provided'}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          `,
        })
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({ message: 'Enquiry submitted successfully', id: result.insertId })
  } catch (error) {
    console.error('Error creating enquiry:', error)
    res.status(500).json({ error: 'Failed to create enquiry' })
  }
}

