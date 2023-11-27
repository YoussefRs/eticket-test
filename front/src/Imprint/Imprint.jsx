import React from "react";
import "../PrivacyPage/PrivacyPage.css";

export default function Imprint() {
  return (
    <main className="privacy_container">
      <div className="_inner_container">
        <p className="_main_title">Impressum</p>
        <p className="_text">Angaben gemäß § 5 TMG</p>
        <p className="_text">eTicket wird herausgegeben von:</p>
        <p className="_title">eGuest & ePassGo GmbH</p>
        <p className="_text">Nachbars Wiesenweg 55</p>
        <p className="_text">38820 Halberstadt</p>
        <p className="_text">Handelsregister: HRB 31325</p>
        <p className="_text">Registergericht: Amtsgericht Stendal</p>
        <p className="_title">Vertreten durch die Geschäftsführer:</p>
        <p className="_text">Oliver Diederichs</p>
        <p className="_text">Andreas Richter</p>
        <p className="_title">Kontakt</p>
        <p className="_text">
          E-Mail: <span className="_underlined">info@eguest.de</span>
        </p>
        <p className="_title">Umsatzsteuer-ID</p>
        <p className="_text">Umsatzsteuer-Identifikationsnummer gemäß § 27 a</p>
        <p className="_text">Umsatzsteuergesetz: DE343493011</p>
        <p className="_title">Redaktionell Verantwortlicher</p>
        <p className="_text">Niklas Baron</p>
        <p className="_text">Nachbars Wiesenweg 55</p>
        <p className="_text">38820 Halberstadt</p>
        <p className="_text">
          E-Mail: <span className="_underlined">info@eguest.de</span>
        </p>
        <p className="_title">EU-Streitschlichtung</p>
        <p className="_text">
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit: 
          <span className="_underlined">
            https://ec.europa.eu/consumers/odr
          </span>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum. 
        </p>
        <p className="_title">
          Verbraucherstreitbeilegung/Universalschlichtungsstelle
        </p>
        <p className="_text">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </main>
  );
}
