import { FaCalculator, FaMousePointer, FaMoon, FaBolt } from "react-icons/fa";

const Stats = ({ count, clicks, theme }) => {
  return (
    <section className="stats">
      <div className="card">
        <FaCalculator />
        <h3>Counter</h3>
        <h2>{count}</h2>
      </div>

      <div className="card">
        <FaMousePointer />
        <h3>Clicks</h3>
        <h2>{clicks}</h2>
      </div>

      <div className="card">
        <FaMoon />
        <h3>Theme</h3>
        <h2>{theme}</h2>
      </div>

      <div className="card">
        <FaBolt />
        <h3>Status</h3>
        <h2>Active</h2>
      </div>
    </section>
  );
};

export default Stats;