const express = require('express');
const path = require('path');
const { Resend } = require('resend');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const { sender, subject, message } = req.body || {};

    if (!sender || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailPayload = {
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to: process.env.RESEND_TO || 'hughburgessgermany@hotmail.com',
      replyTo: sender,
      subject: subject.trim(),
      html: `
        <p><strong>From:</strong> ${sender}</p>
        <hr>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `,
    };

    const result = await resend.emails.send(emailPayload);

    if (result?.error) {
      throw new Error(result.error.message || 'Unable to send email.');
    }

    return res.status(200).json({ success: true, id: result?.id || null });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Email API listening on http://localhost:${port}`);
});
