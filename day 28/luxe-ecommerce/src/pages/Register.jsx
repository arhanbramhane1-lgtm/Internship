import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const res = register(form.name, form.email, form.password);
    if (res.ok) {
      showToast("Account created — welcome to Lumé");
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <p className="eyebrow mb-3 text-center">Join us</p>
      <h1 className="font-display text-4xl mb-10 text-center">Create Account</h1>

      <form onSubmit={onSubmit} className="space-y-5">
        <input
          required placeholder="Full name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-surface border border-line px-4 py-3 text-sm focus:border-gold outline-none"
        />
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
        <button type="submit" className="btn-gold w-full">Create account</button>
      </form>

      <p className="text-center text-sm text-muted mt-8">
        Already have an account?{" "}
        <Link to="/login" className="text-gold gold-underline">Sign in</Link>
      </p>
    </div>
  );
}
