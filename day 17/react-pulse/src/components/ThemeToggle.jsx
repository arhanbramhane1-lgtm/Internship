import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="theme-toggle">

      <button
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
      >
        {theme === "dark" ? (
          <>
            <FaSun />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <FaMoon />
            <span>Dark Mode</span>
          </>
        )}
      </button>

    </div>
  );
};

export default ThemeToggle;