import { useState } from "react";
import { MdOutlineDoneOutline } from "react-icons/md";

export default function P4Contact({ blok }) {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    sender: "",
    subject: "",
    message: "",
  });

  if (!blok || Object.keys(blok).length === 0) {
    return <main>No page data</main>;
  }

  if (submitted) {
    return (
      <div className="page contact-page">
        <div className="success-message">
          <MdOutlineDoneOutline className="tick"/> <p>Thank you for getting in touch!</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!form.sender.trim()) {
      newErrors.sender = true;
    }
    if (!form.subject.trim()) {
      newErrors.subject = true;
    }
    if (!form.message.trim()) {
      newErrors.message = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("Sending...");
    try {
      const response = await fetch('/api/server', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: form.sender, subject: form.subject, message: form.message })
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({
          sender: "",
          subject: "",
          message: "",
        });
        setStatus("");
        setErrors({});
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="page contact-page">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className={`form-field ${errors.sender ? 'error' : ''}`}>
            <label htmlFor="sender">Email</label>
            <input
              id="sender"
              name="sender"
              type="email"
              value={form.sender}
              onChange={handleChange}
            />
          </div>

          <div className={`form-field ${errors.subject ? 'error' : ''}`}>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={`form-field ${errors.message ? 'error' : ''}`}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={10}
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