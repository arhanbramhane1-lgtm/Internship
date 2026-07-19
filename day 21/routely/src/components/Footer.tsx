import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Footer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">◆ Routely</div>
          <p className="footer-copy">
            A React Router navigation dashboard — built for the Frontend Internship
            Day 20 task.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Today</h4>
            <p>{now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
            <p>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {now.getFullYear()} Routely · Crafted with React & TanStack Router
      </div>
    </footer>
  );
}
