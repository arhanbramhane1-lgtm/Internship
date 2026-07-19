import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (res.ok) {
      showToast("Welcome back");
      navigate(location.state?.from?.pathname || "/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <p className="eyebrow mb-3 text-center">Welcome back</p>
      <h1 className="font-display text-4xl mb-10 text-center">Sign In</h1>

      <form onSubmit={onSubmit} className="space-y-5">
        <input
          required type="email" placeholder="Email address" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-surface border border-line px-4 py-3 text-sm focus:border-gold outline-none"
        />
        <input
          required type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-surface border border-line px-4 py-3 text-sm focus:border-gold outline-none"
        />
        {error && <p className="text-red-300 text-sm">{error}</p>}
        <button type="submit" className="btn-gold w-full">Sign in</button>
      </form>

      <p className="text-center text-sm text-muted mt-8">
        New here?{" "}
        <Link to="/register" className="text-gold gold-underline">Create an account</Link>
      </p>
    </div>
  );
}
