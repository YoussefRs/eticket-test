import React from "react";

export default function NotFound() {
  const notFoundStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f7f7",
    color: "#333",
  };

  const errorContainerStyle = {
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={notFoundStyle}>
      <div style={errorContainerStyle}>
        <h1>404 - Nicht gefunden</h1>
        <p>Ooops! Die gesuchte Seite existiert nicht.</p>
        <a href="/" style={{ textDecoration: "none", color: "#007bff" }}>
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
}
