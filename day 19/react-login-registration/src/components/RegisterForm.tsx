import { useState } from "react";
import { InputField } from "./InputField";

type Errors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setSuccess("");
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.fullName.trim()) e.fullName = "Full name is required.";
    else if (values.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
    if (!values.email.trim()) e.email = "Email is required.";
    else if (!emailRe.test(values.email)) e.email = "Enter a valid email address.";
    if (!values.password) e.password = "Password is required.";
    else if (values.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!values.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (values.confirmPassword !== values.password)
      e.confirmPassword = "Passwords do not match.";
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
      setSuccess("Account created successfully. You can sign in now.");
      setValues({ fullName: "", email: "", password: "", confirmPassword: "" });
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <InputField
        label="Full Name"
        name="fullName"
        value={values.fullName}
        placeholder="Jane Doe"
        error={errors.fullName}
        onChange={onChange}
        autoComplete="name"
      />
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
        placeholder="At least 8 characters"
        error={errors.password}
        onChange={onChange}
        isPassword
        autoComplete="new-password"
      />
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        value={values.confirmPassword}
        placeholder="Re-enter password"
        error={errors.confirmPassword}
        onChange={onChange}
        isPassword
        autoComplete="new-password"
      />
      <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: 6 }}>
        {submitting ? "Creating account…" : "Register"}
      </button>
      {success && <div className="success">{success}</div>}
    </form>
  );
}