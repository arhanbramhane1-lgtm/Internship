import "./About.css";

/**
 * About Page
 * - Explains React Router concepts with rich cards
 * - Timeline showing how routing works
 * - Professional card layout for internship demo
 */
const About = () => {
  const concepts = [
    {
      icon: "🚦",
      title: "Client-Side Routing",
      desc: "React Router intercepts navigation events and updates the UI without a full page reload. The browser URL changes but no HTTP request is made to the server for HTML.",
      tag: "<BrowserRouter>",
      color: "rgba(124, 58, 237, 0.12)",
      tagColor: "#7c3aed",
    },
    {
      icon: "🔀",
      title: "Dynamic Routes",
      desc: "Routes with URL parameters like /products/:id allow a single component to render different content based on the value in the URL. Accessed via the useParams() hook.",
      tag: "/products/:id",
      color: "rgba(247, 37, 133, 0.12)",
      tagColor: "#f72585",
    },
    {
      icon: "🧩",
      title: "Component Architecture",
      desc: "Each page is an isolated React component. Shared elements like the Navbar are rendered outside the <Routes> so they persist across all route changes.",
      tag: "<Routes> & <Route>",
      color: "rgba(76, 201, 240, 0.12)",
      tagColor: "#4cc9f0",
    },
    {
      icon: "🔗",
      title: "NavLink & Link",
      desc: "The <Link> component renders an anchor tag that prevents default browser navigation. <NavLink> extends this by automatically adding an 'active' class to the current route.",
      tag: "<NavLink> / <Link>",
      color: "rgba(244, 162, 97, 0.12)",
      tagColor: "#f4a261",
    },
    {
      icon: "🧭",
      title: "useNavigate Hook",
      desc: "The useNavigate() hook returns a navigate function for programmatic navigation — perfect for post-form-submit redirects or button click handlers inside components.",
      tag: "useNavigate()",
      color: "rgba(46, 196, 182, 0.12)",
      tagColor: "#2ec4b6",
    },
    {
      icon: "📍",
      title: "useParams Hook",
      desc: "The useParams() hook reads URL parameters from the current route. Used in the ProductDetails page to extract the product :id and fetch the correct data.",
      tag: "useParams()",
      color: "rgba(114, 9, 183, 0.12)",
      tagColor: "#7209b7",
    },
  ];

  const timeline = [
    {
      icon: "1️⃣",
      title: "User Clicks a Link",
      desc: "The user clicks a <Link> or <NavLink>. React Router intercepts the event and prevents the browser's default navigation.",
    },
    {
      icon: "2️⃣",
      title: "URL Updates",
      desc: "The browser's URL bar updates using the History API (pushState) without triggering a full page reload.",
    },
    {
      icon: "3️⃣",
      title: "Router Matches Route",
      desc: "<Routes> compares the new URL against all registered <Route path> patterns and finds the best match.",
    },
    {
      icon: "4️⃣",
      title: "Component Renders",
      desc: "The matching route's element (React component) is rendered into the DOM, replacing the previous page component.",
    },
    {
      icon: "5️⃣",
      title: "State is Preserved",
      desc: "Since there's no full reload, global state (theme, user session, etc.) and scroll position of unchanged components are preserved.",
    },
  ];

  return (
    <main className="page-enter">
      {/* Hero */}
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="hero-eyebrow">💡 About This Project</div>
        <h1 className="about-hero-title" id="about-heading">
          Understanding{" "}
          <span className="gradient-text">React Router</span>
        </h1>
        <p className="about-hero-desc">
          This project was built for Day 20 of a Frontend Developer Internship to
          demonstrate React Router DOM — the standard routing library for React
          applications. Explore how client-side navigation, dynamic routes, and
          route hooks work in practice.
        </p>
      </section>

      {/* Router Concepts */}
      <section className="about-concepts" aria-label="React Router Concepts">
        <div className="section-container">
          <div className="section-label">🧠 Core Concepts</div>
          <h2 className="section-title">
            React Router <span className="gradient-text">Explained</span>
          </h2>
          <p className="section-subtitle">
            Six fundamental concepts that power this entire application.
          </p>

          <div className="concepts-grid">
            {concepts.map(({ icon, title, desc, tag, color, tagColor }) => (
              <article
                key={title}
                className="concept-card"
                style={{ "--card-color": `linear-gradient(135deg, ${tagColor}, transparent)` }}
              >
                <div className="concept-icon">{icon}</div>
                <h3 className="concept-title">{title}</h3>
                <p className="concept-desc">{desc}</p>
                <span
                  className="concept-tag"
                  style={{
                    background: color,
                    color: tagColor,
                  }}
                >
                  {tag}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How Routing Works Timeline */}
      <section className="about-timeline" aria-label="How routing works">
        <div className="section-label">⚙️ Under the Hood</div>
        <h2 className="section-title">
          How Client-Side <span className="gradient-text">Routing Works</span>
        </h2>
        <p className="section-subtitle">
          Step by step — what happens when you click a link in this app.
        </p>

        <div className="timeline">
          {timeline.map(({ icon, title, desc }) => (
            <div key={title} className="timeline-item">
              <div className="timeline-dot">{icon}</div>
              <div className="timeline-content">
                <h3 className="timeline-title">{title}</h3>
                <p className="timeline-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
