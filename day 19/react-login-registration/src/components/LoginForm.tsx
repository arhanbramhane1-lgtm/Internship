import { useState } from "react";
import { InputField } from "./InputField";

type Errors = { email?: string; password?: string };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    setSuccess("");
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.email.trim()) e.email = "Email is required.";
    else if (!emailRe.test(values.email)) e.email = "Enter a valid email address.";
    if (!values.password) e.password = "Password is required.";
    else if (values.password.length < 8) e.password = "Password must be at least 8 characters.";
    return e;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess("Signed in successfully. Welcome back!");
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <InputField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        placeholder="you@example.com"
        error={errors.email}
        onChange={onChange}
        autoComplete="email"
      />
      <InputField
        label="Password"
        name="password"
        value={values.password}
        placeholder="••••••••"
        error={errors.password}
        onChange={onChange}
        isPassword
        autoComplete="current-password"
      />
      <div className="row-between">
        <label className="remember">
          <input
            type="checkbox"
            name="remember"
            checked={values.remember}
            onChange={onChange}
          />
          Remember me
        </label>
        <a href="#" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>
          Forgot?
        </a>
      </div>
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Signing in…" : "Login"}
      </button>
      {success && <div className="success">{success}</div>}
    </form>
  );
}