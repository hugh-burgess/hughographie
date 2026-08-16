const EMAIL_API_URL = process.env.REACT_APP_CONTACT_API_URL || '/api/send-email';

export function buildEmailPayload(form = {}) {
  const sender = String(form.sender || '').trim();
  const subject = String(form.subject || '').trim();
  const message = String(form.message || '').trim();

  return {
    from: 'Hughographie Bot | <onboarding@resend.dev>',
    to: 'hughburgessgermany@hotmail.com',
    replyTo: sender,
    subject: subject || 'New message from the website',
    html: `
      <p><strong>From:</strong> ${sender}</p>
      <hr>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };
}

export default async function sendEmail(form) {
  const response = await fetch(EMAIL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Failed to send email.');
  }

  console.log('sent!')

  return data;
}