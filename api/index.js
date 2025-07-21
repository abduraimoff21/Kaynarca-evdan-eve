// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import nodemailer

// Initialize the Express application
const app = express();

// Middleware setup
// Enable CORS for all origins. In a production environment, you should restrict this
// to only your frontend's domain for better security.
app.use(cors());

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// Configure Nodemailer transporter
// IMPORTANT: Use environment variables for sensitive credentials like EMAIL_USER and EMAIL_PASS
// You will set these in your Vercel project settings.
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or 'smtp' for other providers
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail App Password (or regular password if less secure)
    }
});

// Define the API endpoint for form submission
app.post('/submit-form', async (req, res) => { // Made the function async to await email sending
    // Extract data from the request body
    const { name, email, phoneNumber, message } = req.body;

    // Log the received data to the console (for demonstration purposes)
    console.log('Received form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone Number: ${phoneNumber}`);
    console.log(`Message: ${message}`);

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address (your Gmail)
        to: 'your-receiving-email@example.com', // The email address where you want to receive the form data
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');

        // Send a success response back to the client
        res.status(200).json({
            message: 'Form submitted successfully!',
            receivedData: { name, email, phoneNumber, message }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        // Send an error response back to the client if email sending fails
        res.status(500).json({
            message: 'Failed to submit form and send email. Please try again later.'
        });
    }
});

// IMPORTANT: Export the Express app instance for Vercel Serverless Functions
module.exports = app;
