import { useState, useEffect } from "react";
// BrowserRouter wraps the entire app to enable React Router
// Routes renders the first matching <Route>
// Route maps a URL path to a component
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

/**
 * ScrollToTop — scrolls to top on every route change
 * Must be inside BrowserRouter to use useLocation
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

/**
 * PageLoader — brief loading animation on first paint
 */
const PageLoader = () => (
  <div className="loader-overlay" role="status" aria-label="Loading">
    <div className="loader-ring" />
  </div>
);

/**
 * App — Root component
 *
 * Routing Architecture:
 * - BrowserRouter  → provides routing context to the whole tree
 * - NavBar / Footer → live outside <Routes> so they persist on every page
 * - <Routes>       → renders only the first <Route> that matches the URL
 * - path="*"       → catches all unmatched routes (404)
 */
const App = () => {
  // Dark/light theme state — persisted in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("rr-theme") || "dark";
  });

  // Apply data-theme attribute to root element for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rr-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    // BrowserRouter — the root router, enables HTML5 history API navigation
    <BrowserRouter>
      <ScrollToTop />
      <PageLoader />

      {/* Navbar is rendered outside <Routes> — visible on all pages */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main content area — padding-top accounts for fixed navbar */}
      <div style={{ paddingTop: "70px", minHeight: "100vh" }}>
        {/*
          Routes — acts like a switch; renders the first <Route> that matches.
          Order matters: more specific routes should come before wildcards.
        */}
        <Routes>
          {/* Static Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />

          {/* Dynamic Route — :id is a URL parameter read by useParams() */}
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Catch-all 404 — path="*" matches any unmatched URL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Footer is rendered outside <Routes> — visible on all pages */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
