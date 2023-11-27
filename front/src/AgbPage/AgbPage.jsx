import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../PrivacyPage/PrivacyPage.css";

export default function AgbPage() {
  const { hash } = useLocation();
  useEffect(() => {
    const scrollFunction = () => {
      const elementId = hash.replace("#", "");
      const element = document.getElementById(elementId);

      if (element) {
        const topPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: topPosition - 100, behavior: "smooth" });
      }
    };
    const scrollTimeout = setTimeout(scrollFunction, 100);

    return () => clearTimeout(scrollTimeout);
  }, [hash]);

  return (
    <main className="privacy_container">
      <div className="_inner_container">
        <p className="_main_title">
          Allgemeine Geschäftsbedingungen (AGB) für die Nutzung von eTicket
        </p>
        <ol>
          <li>
            <p className="_title">Allgemeines </p>
            <ul>
              <li>
                <p className="_text">
                  Das Unternehmen eGuest & ePassGo GmbH ist Anbieter der
                  Ticketplattform eTicket, nachfolgend eTicket genannt, und
                  somit kein Veranstalter der angebotenen Veranstaltungen. Dies
                  gilt für alle Arten von Veranstaltungen, egal ob Sport,
                  Konzert, Kabarett und andere.
                </p>
              </li>
              <li>
                <p className="_text">
                  Die Organisation einer Veranstaltung obliegt einzig dem
                  jeweiligen Veranstalter, der dann auch die Verwaltung der
                  vereinnahmten Entgelte in seiner Verantwortung hat. Mit dem
                  Erwerb eines Tickets entsteht einzig mit dem Veranstalter eine
                  Vertragssituation. Dabei ist es möglich, dass der Veranstalter
                  eigene AGB´s zur Grundlage der Ticketverkäufe erstellt hat.
                </p>
              </li>
              <li>
                <p className="_text">
                  Lediglich kurzfristig dient eTicket als „Clearingstation“ für
                  alle bezahlten Tickets, um durch diese Maßnahme eine optimale
                  und stabile Übermittlung der Kundengelder über die
                  unterschiedlichen Zahlungsdienstleister gewährleisten zu
                  können. Nach spätestens sieben Tagen werden die jeweiligen
                  Entgelte an den Veranstalter übermittelt.
                </p>
              </li>
              <li>
                <p className="_text">
                  eTicket ist ausdrücklich kein Kartenverkäufer, sondern
                  lediglich Anbieter einer Plattform.
                </p>
              </li>
              <li>
                <p className="_text">
                  eTicket behält sich aber ausdrücklich das Recht vor, selbst
                  als Veranstalter aufzutreten. Dies wird dann eindeutig in der
                  Verkaufsabwicklung sichtbar.
                </p>
              </li>
              <li>
                <p className="_text">
                  Kunden können durch entsprechende Registrierung einen
                  Kunden-Account anlegen (siehe auch{" "}
                  <Link to={"/privacy"}>Datenschutz</Link>).
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p className="_title">Vertrags- und Zahlungsmodalitäten</p>
            <ul>
              <li>
                <p className="_text">
                  Die Angebote von eTicket sind freibleibend. Technische sowie
                  sonstige Änderungen bleiben im Rahmen des Zumutbaren
                  vorbehalten. Für die Richtigkeit der im Onlineauftritt
                  „my-eticket.de“ enthaltenen Daten wird keine Gewähr
                  übernommen.
                </p>
              </li>
              <li>
                <p className="_text">
                  Mit der Bestellung erklärt der Kunde verbindlich sein
                  Vertragsangebot, indem er den Kaufbutton, also die eindeutig
                  markierte Schaltfläche, betätigt hat.
                </p>
              </li>
              <li>
                <p className="_text">
                  eTicket ist berechtigt, die Annahme der Bestellung – etwa nach
                  Prüfung der Bonität des Kunden – oder bei Verstößen von
                  spezifischen Bedingungen, auf die im Rahmen des Vorverkaufs
                  hingewiesen wurde, oder beim Versuch diese zu umgehen (z. B.
                  durch Anmeldung und Nutzung mehrerer Kundenprofile),
                  abzulehnen. eTicket ist berechtigt, die Bestellung auf eine
                  bestimmte Menge zu begrenzen.
                </p>
              </li>
              <li>
                <p className="_text">
                  Soweit beim Kauf nicht anderweitig vereinbart, ist ein
                  Weiterverkauf (egal ob gewerblich oder nicht gewerblich) der
                  Eintrittskarte(n) nicht gestattet. Beim Verstoß gegen diese
                  Modalität hat der jeweilige Veranstalter das Recht den Zutritt
                  zu seiner Veranstaltung ersatzlos zu verweigern.
                </p>
              </li>
              <li>
                <p className="_text">
                  eTicket bietet verschiedenen Zahlungsmöglichkeiten an. Die
                  gesetzliche Mehrwertsteuer ist im Preis enthalten. Der
                  Gesamtpreis der Bestellung inkl. aller Gebühren ist nach
                  Vertragsabschluss fällig. Bei der Zahlart Überweisung ist der
                  Gesamtpreis bis zum mitgeteilten Datum vollständig auf das
                  jeweils angegebene Konto zu überweisen.
                </p>
              </li>
              <li>
                <p className="_text">
                  Bei einer Bestellung können Service- und Versandkosten erhoben
                  werden. Diese Gebühren werden dem Kunden bei der Bestellung im
                  Warenkorb angezeigt. Darüber hinaus entstehen keine weiteren
                  Kosten. Das bedeutet, die Preise für Tickets können im
                  Einzelfall die aufgedruckten Preise übersteigen.
                </p>
              </li>
              <li>
                <p className="_text">
                  eTicket greift bei der Abwicklung von Zahlungen auf externe
                  Zahlungsdienstleister zurück. Diese erbringen für die eTicket
                  Dienstleistungen durch das Angebot verschiedener
                  Bezahlverfahren. Zu diesen Verfahren gibt es weiterführende
                  Informationen – siehe <Link to={"/privacy"}>Datenschutz</Link>
                  .
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p className="_title" id="Stornierung">
              Stornierung, Widerrufsrecht
            </p>
            <ul>
              <li>
                <p className="_text">
                  Das Widerrufsrecht besteht, soweit die Parteien nichts anderes
                  vereinbart haben, nicht bei folgenden Verträgen: (§ 312g Abs.
                  2 Nr. 9 BGB):
                </p>
                <p className="_text">
                  Verträge zur Erbringung von Dienstleistungen in den Bereichen
                  Beherbergung zu anderen Zwecken als zu Wohnzwecken,
                  Beförderung von Waren, Kraftfahrzeugvermietung, Lieferung von
                  Speisen und Getränken sowie zur Erbringung weiterer
                  Dienstleistungen im Zusammenhang mit Freizeitbetätigungen,
                  wenn der Vertrag für die Erbringung einen spezifischen Termin
                  oder Zeitraum vorsieht,
                </p>
              </li>
              <li>
                <p className="_text">
                  Für den Verkauf von Eintrittskarten gilt somit das o.g. Gesetz
                  und es besteht gegenüber eTicket kein Widerrufsrecht.
                </p>
              </li>
              <li>
                <p className="_text">
                  Sollte es zur Verlegung einer Veranstaltung kommen, ist der
                  Veranstalter berechtigt, die Gültigkeit der erworbenen Tickets
                  der verlegten Veranstaltung für den neuen, verlegten Termin
                  der Veranstaltung zu erklären. Eine Rückgabe der Tickets beim
                  Veranstalter infolge der Verlegung ist in diesen Fällen nicht
                  möglich, es sei denn, die Wahrnehmung des verlegten Termins
                  ist für den Ticketinhaber nachweislich nicht zumutbar. Diese
                  Klausel gilt nur für den Fall einer Verlegung durch den
                  Künstler.
                </p>
              </li>
            </ul>
            <p className="_text">
              Für alle anderen Verträge, unter Ausschluss der Festlegung § 3.1,
              gilt das Folgende:
            </p>
            <p className="_text">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
              diesen Vertrag zu widerrufen. Bitte füllen Sie hierfür das
              nachstehende Formular aus und senden es an:
            </p>
            <p className="_text">
              Postalisch - eGuest & ePassGo GmbH, Nachbars Wiesenweg 55, 38820
              Halberstadt oder
            </p>
            <p className="_text _underlined">Fax - +49 3941 595887 oder</p>
            <p className="_text _underlined">E-Mail - info@my-eticket.de</p>
            <p className="_text">
              Mit dieser eindeutigen Erklärung (z.B. ein mit der Post versandter
              Brief, Telefax oder E-Mail) übermittelt der Kunde seinen
              Entschluss, diesen Vertrag zu widerrufen. Dafür kann das folgende
              Formular genutzt werden. Bitte auf die Regelung in Abs. 1 dieses §
              achten.
            </p>
            <p className="_text _emphasized">
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
              abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)
            </p>
            <p className="_text _emphasized">Bestellt am (*)/erhalten am (*)</p>
            <p className="_text _emphasized">Name des/der Verbraucher(s)</p>
            <p className="_text _emphasized">
              Anschrift des/der Verbraucher(s)
            </p>
            <p className="_text _emphasized">
              Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf
              Papier)
            </p>
            <p className="_text _emphasized">Datum</p>
          </li>
          <li>
            <p className="_title">Haftungsbeschränkung</p>
            <ul>
              <li>
                <p className="_text">
                  eTicket haftet nach dem Produkthaftungsgesetz für vorsätzlich
                  oder grob fahrlässig verursachte Schäden, bei arglistigem
                  Verschweigen von Mängeln, sowie für Schäden aus der Verletzung
                  des Lebens, des Körpers oder der Gesundheit. Die Haftung für
                  Schäden aus der Verletzung einer Garantie ist unbeschränkt.
                </p>
              </li>
              <li>
                <p className="_text">
                  Für die Inhalte verlinkter Webseiten ist eTicket nicht
                  verantwortlich und macht sich diese Inhalte nicht zu Eigen.
                </p>
              </li>
              <li>
                <p className="_text">
                  Das Recht des Kunden, sich wegen einer nicht vom Veranstalter
                  oder eTicket zu vertretenden Pflichtverletzung vom Vertrag zu
                  lösen, ist ausgeschlossen, solange kein Mangel an der Ware
                  besteht.
                </p>
              </li>
              <li>
                <p className="_text">
                  Der Kunde stellt eTicket von allen Ansprüchen frei, die
                  eTicket durch Dritte wegen schädigender Handlungen des Kunden
                  entstehen können. Dabei sind Fahrlässigkeit oder Vorsatz
                  gleichgültig.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p className="_title">Datenschutz</p>
            <ul>
              <li>
                <p className="_text">
                  Der Kunde ist über Art, Umfang und Zweck der Erhebung,
                  Verarbeitung und Nutzung der für die Ausführung von
                  Ticketkäufen erforderlichen personenbezogenen Daten
                  unterrichtet worden, siehe{" "}
                  <Link to={"/privacy"}>Datenschutz</Link>.
                </p>
              </li>
              <li>
                <p className="_text">
                  Der Kunde stimmt der Erhebung, Verarbeitung und Nutzung
                  personenbezogener Daten ausdrücklich zu, das Recht auf
                  jederzeitigen Widerruf der Einwilligung mit Wirkung für die
                  Zukunft ist unbenommen.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p className="_title">Außergerichtliche Streitbeilegung</p>
            <p className="_text">
              Aufgrund einer gesetzlichen Verpflichtung ist eTicket
              verpflichtet, die Kunden unabhängig von einer Teilnahme an einem
              Verfahren zur alternativen Streitbeilegung darüber zu informieren,
              dass die Europäische Kommission zur außergerichtlichen
              Streitbeilegung von verbraucherrechtlichen Streitigkeiten eine
              Plattform zur Online-Streitbeilegung (OS) eingerichtet hat. Die
              Plattform finden Kunden unter:
            </p>
            <p className="_text">
              <a
                href="http://ec.europa.eu/consumers/odr/"
                rel="noreferrer"
                target={"_blank"}
              >
                http://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="_text">
              Die eGuest & ePassGo GmbH wird nicht an einer Streitbeilegung vor
              einer Verbraucherschlichtungsstelle im Sinne des VSBG teilnehmen
              und ist hierzu auch nicht verpflichtet.
            </p>
            <p className="_text">
              Unserer E-Mailadresse lautet: info[at]my-eticket.de
            </p>
          </li>
          <li>
            <p className="_title">Gerichtsstand</p>
            <p className="_text">
              Erfüllung und Gerichtsstand ist für beide Teile Halberstadt.
            </p>
          </li>
          <li>
            <p className="_title">Teilnichtigkeit</p>
            <p className="_text">
              Sind einzelne der vorstehenden Bestimmungen nicht gültig oder
              schwebend rechtlich wirksam, werden alle übrigen Bestimmungen
              davon nicht berührt.
            </p>
          </li>
        </ol>
      </div>
    </main>
  );
}
