import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validation";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    setSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      login(formData.email, formData.password);
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
          <h1>Welcome Back</h1>
          <p>Login to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
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

          {serverError && <div className="server-error">{serverError}</div>}

          <button type="submit" className="auth-btn" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
