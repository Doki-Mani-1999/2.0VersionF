import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
        timeZoneName: "short"
      };
      const formatter = new Intl.DateTimeFormat("en-IN", options);
      setDateTime(formatter.format(now));
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // live clock

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "100px",
        height: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Welcome to Job Portal</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>Please choose an option:</p>

      <div>
        <Link to="/login">
          <button
            style={{
              margin: "10px",
              padding: "12px 30px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              color: "#2575fc",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={e => (e.target.style.backgroundColor = "#e6e6e6")}
            onMouseOut={e => (e.target.style.backgroundColor = "#ffffff")}
          >
            Login
          </button>
        </Link>

        <Link to="/register">
          <button
            style={{
              margin: "10px",
              padding: "12px 30px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              color: "#2575fc",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={e => (e.target.style.backgroundColor = "#e6e6e6")}
            onMouseOut={e => (e.target.style.backgroundColor = "#ffffff")}
          >
            Register
          </button>
        </Link>
      </div>

      <div style={{ marginTop: "40px", fontSize: "1rem", opacity: 0.9 }}>
        <p>🕒 Current IST Time:</p>
        <p>{dateTime}</p>
      </div>
    </div>
  );
};

export default Home;
