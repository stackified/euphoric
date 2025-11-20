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
    const { name, phone, email, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    // Save to database
    const [result] = await pool.execute(
      'INSERT INTO enquiries (name, phone, email, message) VALUES (?, ?, ?, ?)',
      [name, phone || null, email, message]
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
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
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

