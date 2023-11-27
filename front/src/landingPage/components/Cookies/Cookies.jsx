import React from "react";
import { Link } from "react-router-dom";
import "./Cookies.css";

export default function Cookies({ setDisplayCookies }) {
  const onDecline = () => {
    const choice = "decline";
    localStorage.setItem("cookies", JSON.stringify(choice));
    setDisplayCookies(false);
  };

  const onAccept = () => {
    const choice = "accept";
    localStorage.setItem("cookies", JSON.stringify(choice));
    setDisplayCookies(false);
  };

  return (
    <main className="coockies_container">
      <p className="_title">Über Cookies auf dieser Website</p>
      <div className="cookies_divider_lg mb-3"></div>
      <div className="cookies_divider_sm"></div>
      <p className="_text my-3">
        Erfahrungen sind alles. E-ticket und unsere Veranstalter sowie Partner
        verwenden Cookies, um Ihnen eine persönlichere und effizientere
        Online-Erfahrung zu ermöglichen. Cookies ermöglichen es uns, die Nutzung
        und Leistung der Website zu überwachen, relevantere Inhalte und Anzeigen
        bereitzustellen und neue Produkte zu entwickeln. Sie können diese
        Cookies akzeptieren, indem Sie auf 'Akzeptieren' klicken, oder sie
        ablehnen, indem Sie auf 'Ablehnen' klicken. Weitere Informationen finden
        Sie in unserer <Link to={"/privacy"}>Datenschutzrichtlinie</Link>.
      </p>
      <div className="_buttons">
        <button
          className="btn _decline_btn"
          onClick={() => {
            onDecline();
          }}
        >
          Ablehnen
        </button>
        <button
          className="btn _accept_btn"
          onClick={() => {
            onAccept();
          }}
        >
          Akzeptieren
        </button>
      </div>
    </main>
  );
}
