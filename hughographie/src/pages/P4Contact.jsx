import { useState } from "react";
import sendEmail from "../utils/resend";

export default function P4Contact({ blok }) {
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    sender: "",
    subject: "",
    message: "",
  });

  if (!blok || Object.keys(blok).length === 0) {
    return <main>No page data</main>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");
    try {
      await sendEmail(form);

      setStatus("Email sent successfully.");

      setForm({
        sender: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="page contact-page">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="sender">Sender</label>
            <input
              id="sender"
              name="sender"
              type="email"
              value={form.sender}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={10}
            required
          />
        </div>

        <button type="submit" className="form-submit">
          {blok.buttonLabel}
        </button>

        {status && <p>{status}</p>}
      </form>
    </div>
  );
}