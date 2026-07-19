import { useEffect, useState } from "react";
import { FaReact } from "react-icons/fa";

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();

  let greeting = "Good Evening 🌙";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon 🌤️";
  } else if (hour >= 17 && hour < 20) {
    greeting = "Good Evening 🌇";
  }

  return (
    <header className="header">

      <div className="logo">
        <FaReact className="logo-icon" />
        <h1>ReactPulse</h1>
      </div>

      <div className="hero">

        <h2>{greeting}, Arhan 👋</h2>

        <p>
          Build beautiful interfaces. Learn React.
          Become a professional developer.
        </p>

        <div className="datetime">

          <h3>
            {time.toLocaleDateString("en-IN", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>

          <h1>{time.toLocaleTimeString()}</h1>

        </div>

      </div>

    </header>
  );
};

export default Header;