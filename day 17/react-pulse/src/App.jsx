import { useState, useEffect } from "react";

import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import Stats from "./components/Stats";
import Counter from "./components/Counter";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  // Counter State
  const [count, setCount] = useState(0);

  // Click Counter
  const [clicks, setClicks] = useState(0);

  // Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // Apply Theme
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Counter Functions
  const increase = () => {
    setCount((prev) => prev + 1);
    setClicks((prev) => prev + 1);
  };

  const decrease = () => {
    setCount((prev) => prev - 1);
    setClicks((prev) => prev + 1);
  };

  const increaseFive = () => {
    setCount((prev) => prev + 5);
    setClicks((prev) => prev + 1);
  };

  const decreaseFive = () => {
    setCount((prev) => prev - 5);
    setClicks((prev) => prev + 1);
  };

  const reset = () => {
    setCount(0);
    setClicks(0);
  };

  return (
    <div className="app">
      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
      />

      <Header />

      <Stats
        count={count}
        clicks={clicks}
        theme={theme}
      />

      <Counter
        count={count}
        increase={increase}
        decrease={decrease}
        increaseFive={increaseFive}
        decreaseFive={decreaseFive}
        reset={reset}
      />

      <Footer />
    </div>
  );
}

export default App;