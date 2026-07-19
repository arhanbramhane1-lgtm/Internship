import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    const newErrors = { ...errors };
    if (name === "name") newErrors.name = validateName(value);
    if (name === "email") newErrors.email = validateEmail(value);
    if (name === "password") {
      newErrors.password = validatePassword(value);
      newErrors.confirmPassword = validateConfirmPassword(
        value,
        updatedForm.confirmPassword
      );
    }
    if (name === "confirmPassword") {
      newErrors.confirmPassword = validateConfirmPassword(
        updatedForm.password,
        value
      );
    }
    setErrors(newErrors);
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err);
    if (hasErrors) return;

    setSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      register(formData.name, formData.email, formData.password);
      navigate("/welcome");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Start your journey with us</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Arhan Sheikh"
              className={errors.name ? "error-input" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? "error-input" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.confirmPassword ? "error-input" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          {serverError && <div className="server-error">{serverError}</div>}

          <button type="submit" className="auth-btn" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
