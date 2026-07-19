import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Routely" },
      { name: "description", content: "Get in touch with the Routely team through a modern, validated contact form." },
      { property: "og:title", content: "Contact — Routely" },
      { property: "og:description", content: "Send a message with our validated contact form." },
    ],
  }),
  component: Contact,
});

interface FormState { name: string; email: string; message: string }
type Errors = Partial<Record<keyof FormState, string>>;

function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (f: FormState): Errors => {
    const e: Errors = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (f.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <Layout>
      <section className="page-hero">
        <span className="hero-pill">Contact</span>
        <h1>Let's <span className="grad-text">talk</span>.</h1>
        <p>Questions, feedback, or a job offer? Drop a note below.</p>
      </section>

      <section className="section contact-section">
        <form className="contact-form glass-panel" onSubmit={onSubmit} noValidate>
          {sent && (
            <div className="alert-success" role="status">
              ✓ Thanks! Your message has been sent.
            </div>
          )}

          <label className="field">
            <span>Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ada Lovelace"
            />
            {errors.name && <em className="field-err">{errors.name}</em>}
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ada@example.com"
            />
            {errors.email && <em className="field-err">{errors.email}</em>}
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us what's on your mind…"
            />
            {errors.message && <em className="field-err">{errors.message}</em>}
          </label>

          <button type="submit" className="btn btn-primary btn-lg">Send message</button>
        </form>
      </section>
    </Layout>
  );
}
