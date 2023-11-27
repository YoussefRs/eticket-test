import React from "react";

export default function PaymentSuccess() {
  const successStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f7f7",
    color: "#333",
  };

  const successContainerStyle = {
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={successStyle}>
      <div style={successContainerStyle}>
        <h1>Zahlung erfolgreich!</h1>
        <p>Vielen Dank! Ihre Zahlung war erfolgreich.</p>
        <p>Ein Bestätigungs-E-Mail wurde an Ihre Adresse gesendet.</p>
        <a href="/" style={{ textDecoration: "none", color: "#007bff" }}>
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
}
