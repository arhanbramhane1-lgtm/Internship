import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

/**
 * Contact Page
 * - Validated contact form with inline error messages
 * - useNavigate used to redirect back to Home after a delay
 * - Success banner with animation on submission
 */
const Contact = () => {
  // Form field state
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  // Validation errors state
  const [errors, setErrors] = useState({});
  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // useNavigate — programmatic navigation after success
  const navigate = useNavigate();

  // Validate all fields, return error object
  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.subject.trim())
      e.subject = "Subject is required.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    return e;
  };

  // Handle input changes and clear field-level error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  // Navigate back to home
  const handleGoHome = () => navigate("/");

  const contactDetails = [
    { icon: "📧", label: "Email", value: "hello@routedash.dev" },
    { icon: "📍", label: "Location", value: "San Francisco, CA" },
    { icon: "⏰", label: "Response Time", value: "Within 24 hours" },
  ];

  return (
    <main className="page-enter">
      <div className="contact-page">
        {/* Left Info Panel */}
        <aside className="contact-info">
          <div className="section-label">✉️ Get In Touch</div>
          <h1 className="contact-info-title">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="contact-info-desc">
            Have a question, idea, or want to collaborate? Fill out the form and
            we'll get back to you as soon as possible.
          </p>

          <div className="contact-detail-cards">
            {contactDetails.map(({ icon, label, value }) => (
              <div key={label} className="contact-detail-card">
                <div className="contact-detail-icon">{icon}</div>
                <div>
                  <div className="contact-detail-label">{label}</div>
                  <div className="contact-detail-value">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Form Panel */}
        <section className="contact-form-panel" aria-label="Contact Form">
          {submitted ? (
            /* Success State */
            <div className="success-banner">
              <div className="success-icon">✅</div>
              <h3>Message Sent!</h3>
              <p>
                Thank you, <strong>{form.name}</strong>! Your message has been
                received. We'll reply to <strong>{form.email}</strong> within 24
                hours.
              </p>
              {/* useNavigate to go back home */}
              <button className="btn-primary success-btn" onClick={handleGoHome} id="contact-go-home">
                🏠 Back to Home
              </button>
            </div>
          ) : (
            <>
              <h2 className="contact-form-title">Send a Message</h2>
              <p className="contact-form-subtitle">
                All fields are required. We'll never share your details.
              </p>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                id="contact-form"
              >
                {/* Name & Email row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      className={`form-input ${errors.name ? "error" : ""}`}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <span className="form-error" id="name-error" role="alert">
                        ⚠ {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      className={`form-input ${errors.email ? "error" : ""}`}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <span className="form-error" id="email-error" role="alert">
                        ⚠ {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    className={`form-input ${errors.subject ? "error" : ""}`}
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <span className="form-error" id="subject-error" role="alert">
                      ⚠ {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className={`form-textarea ${errors.message ? "error" : ""}`}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <span className="form-error" id="message-error" role="alert">
                      ⚠ {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={loading}
                  id="contact-submit"
                >
                  {loading ? (
                    <>
                      <span className="loader-ring" style={{ width: 20, height: 20, borderWidth: 2 }} />
                      Sending...
                    </>
                  ) : (
                    "Send Message 🚀"
                  )}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Contact;
