const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importez le module CORS

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Activez CORS pour toutes les routes

// Configure Nodemailer transporter with your email provider's settings
const transporter = nodemailer.createTransport({
  service: 'gmail', // Change this to your email provider
  auth: {
    user: 'amirathbello4@gmail.com',
    pass: '123Soleil*123',
  },
});

// Define a route to handle sending emails
app.post('/send-email', (req, res) => {
  const { toEmail, qrDataURL } = req.body;

  const mailOptions = {
    from: 'ptk@gmail.com',
    to: toEmail,
    subject: 'Your QR Code',
    html: `<p>Here is your QR code:</p><img src="${qrDataURL}" alt="QR Code"/>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully.');
    }
  });
});

// Define a route to handle GET requests
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
