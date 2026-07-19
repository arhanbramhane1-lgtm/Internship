import { useEffect, useState } from "react";
import "../styles/auth.css";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

type Mode = "login" | "register";

export function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    setDark(!!prefersDark);
  }, []);

  return (
    <div className={`auth-root ${dark ? "dark" : ""}`}>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle theme"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="auth-card" key={mode}>
        <h1 className="auth-title">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="auth-subtitle">
          {mode === "login"
            ? "Sign in to continue to your dashboard."
            : "Join us — it only takes a minute."}
        </p>

        <div className="tabs" role="tablist">
          <button
            role="tab"
            className={`tab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            role="tab"
            className={`tab ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        <p className="footer">
          Created by <strong>Arhan Bramhane</strong>
        </p>
      </div>
    </div>
  );
}