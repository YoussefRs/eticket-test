import React from "react";
import { Table } from "react-bootstrap";
import "./PrivacyPage.css";

export default function PrivacyPage() {
  return (
    <main className="privacy_container">
      <div className="_inner_container">
        <p className="_main_title">Datenschutzhinweise</p>
        <p className="_text">
          Schön, dass du eTicket gefunden hast. Hier informieren wir dich über
          die Nutzung deiner personenbezogenen Daten, wenn du über eTicket
          Bestellungen tätigst, dich registrierst und / oder unsere Websites,
          Shops und Apps nutzt. Die rechtliche Grundlage der Verarbeitung deiner
          personenbezogenen Daten stellt die in Europa geltende
          Datenschutzgrundverordnung{" "}
          <a
            href="https://de.wikipedia.org/wiki/Datenschutz-Grundverordnung"
            rel="noreferrer"
            target={"_blank"}
          >
            („DSGVO“)
          </a>{" "}
          dar. Damit du eTicket nutzen kannst, müssen wir bestimmte,
          personenbezogene Daten von dir erheben, speichern und an Dritte
          weitergeben. Alle weiteren Infos findest du hier. Bei Fragen kannst du
          dich jederzeit an{" "}
          <span className="_underlined">datenschutz@my-eticket.de</span> wenden.
        </p>
        <p className="_title">Wofür gelten diese Datenschutzhinweise?</p>
        <p className="_text">
          Unsere Datenschutzhinweise gelten für den Besuch und die Nutzung der
          eTicket Websites, Shops und Apps (im Weiteren „eTicket-Services“ sowie
          für den Besuch und die Nutzung von Ticketverkaufsseiten, die durch
          Kooperationspartner von eTicket („Verkäufer/innen“) betrieben werden.
        </p>
        <p className="_highlighted">Wie du eTicket nutzen kannst:</p>
        <p className="_text">
          Die eTicket-Services bieten dir Informationen über Veranstaltungen,
          ermöglichen dir das Kaufen von Tickets sowie das Registrieren und
          Anlegen eines freiwilligen Benutzeraccounts, der dir verschiedene
          Komfort-Funktionen zur Verfügung stellt. Um deinen Ticket-Kauf
          abzuschließen, bieten wir dir die Möglichkeit, dein Ticket über
          verschiedene Zahlungsdienstleister zu bezahlen an.
        </p>
        <p className="_highlighted">
          Hinweis zu Analyse-Tools und Tools von Drittanbietern
        </p>
        <p className="_text">
          Beim Besuch unserer Websites und Apps kann dein Surf-Verhalten
          statistisch ausgewertet werden. Das geschieht vor allem mit
          sogenannten Analyseprogrammen. Detaillierte Informationen zu diesen
          Analyseprogrammen findest du in diesen Datenschutzhinweisen.
        </p>
        <p className="_title">Um welche Daten geht es?</p>
        <p className="_text">
          Unsere Datenschutzhinweise beziehen sich auf die Verarbeitung
          personenbezogener Daten nach Maßgabe der DSGVO. Dabei hast du die
          Möglichkeit, alle Funktionen unter Minimalangabe
          <span className="_bolded">(„Minimalkonfiguration“)</span>{" "}
          personenbezogener Daten zu nutzen oder dein Profil innerhalb der
          eTicket-Services durch hinzufügen weiterer Daten zu vervollständigen{" "}
          <span className="_bolded">(„Komfortkonfiguration“)</span>.
        </p>
        <p className="_text">
          Hier listen wir für dich auf, welches personenbezogene Datum wir von
          dir erheben, zu welchem Zweck wir dies tun und ob diese Daten auch von
          unseren Verkäufer/innen im Rahmen der eTicket-Services genutzt werden.
        </p>
        <p className="_highlighted">
          Minimalkonfiguration personenbezogener Daten:
        </p>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Zweck</th>
              <th>Nutzung durch VK</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>IP-Adresse</th>
              <th>Vertragserfüllung / Sicherheit / Technik</th>
              <th>Nein</th>
            </tr>
            <tr>
              <th>Vorname</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Nachname</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>E-Mail-Adresse</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Zahlungsinformationen</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Rechnungsdatum</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Buchungsdatum</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Buchungstitel</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Buchungstyp</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Rechnungssumme</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
          </tbody>
        </Table>
        <p className="_highlighted">
          Komfortkonfiguration personenbezogener Daten:
        </p>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Zweck</th>
              <th>Nutzung durch VK</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>IP-Adresse</th>
              <th>
                Vertragserfüllung / Sicherheit / Technik / Kommentarfunktion
              </th>
              <th>Nein</th>
            </tr>
            <tr>
              <th>Vorname</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Nachname</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>E-Mail-Adresse</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Zahlungsinformationen</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Rechnungsdatum</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Buchungsdatum</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Buchungstitel</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Buchungstyp</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Rechnungssumme</th>
              <th>Vertragserfüllung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Adresse</th>
              <th>Vertragserfüllung / Rechnungsstellung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Firma</th>
              <th>Vertragserfüllung / Rechnungsstellung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Sprache</th>
              <th>Vertragserfüllung / Spracheinstellungen Benutzerkonto</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Profilbild</th>
              <th>Vertragserfüllung / Spracheinstellungen Benutzerkonto</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Orderhistorie</th>
              <th>Vertragserfüllung / Spracheinstellungen</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Kommentardatum</th>
              <th>Einwilligung</th>
              <th>Ja</th>
            </tr>
            <tr>
              <th>Kommentarinhalt</th>
              <th>Einwilligung</th>
              <th>Ja</th>
            </tr>
          </tbody>
        </Table>
        <p className="_highlighted">Erklärungen:</p>
        <ul className="_text">
          <li>
            Vertragserfüllung: diese Daten benötigen wir von dir, um dir unsere
            eTicket-Services anbieten zu können, z.B. auf welchen Namen du dein
            Ticket kaufst (siehe auch DSGVO, Art. 6 (1) b)).
          </li>
          <li>
            Einwilligung: bedeutet, dass du zu dieser Verarbeitung deine
            Einwilligung gibst, wenn du z.B. einen Kommentar abgeben möchtest
            (siehe auch DSGVO, Art. 6 (1) a)).
          </li>
          <li>
            Weitergabe: meint, dass wir diese Daten an Verkäufer/innen deines
            Tickets und/oder Zahlungsdienstleister weitergeben, um deinen
            Auftrag zu deiner Zufriedenheit ausführen zu können.
          </li>
          <li>
            Zahlungsinformationen: meint die Art und Weise, wie du deinen
            Einkauf bezahlst und u.U. damit verbundene Informationen, die uns
            dein Zahlungsdienstleister zur Verfügung stellt, z.B. deine
            Kontonummer oder die durch uns deinem Zahlungsdienstleister zur
            Verfügung gestellt werden.
          </li>
          <li>
            Buchungsdatum: meint das Datum, an dem deine Buchung stattfindet
            (Eventdatum).
          </li>
          <li>Buchungstitel: meint die Veranstaltung, die du gebucht hast.</li>
          <li>
            Buchungstyp: meint die Kategorie Ticket, die du gebucht hast, z.B.
            Standard, Premium, VIP.
          </li>
          <li>
            Orderhistorie: meint die Übersicht deiner bei den eTicket-Services
            gebuchten Leistungen und Tickets{" "}
          </li>
        </ul>
        <p className="_title">Wie lange speichern wir deine Daten?</p>
        <p className="_text">
          Soweit wir in dieser Datenschutzerklärung keine weitere Speicherdauer
          nennen, verbleiben deine personenbezogenen Daten bei uns, bis der
          Zweck für die jeweilige Datenverarbeitung entfällt. Wenn du uns
          darüber informierst, dass du deine Daten löschen möchtest oder deine
          Einwilligung zur Datenverarbeitung widerrufst, werden deine Daten
          gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die
          Speicherung deiner personenbezogenen Daten haben (z. B. steuer- oder
          handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall
          erfolgt die Löschung nach Fortfall dieser Gründe. Detaillierte
          Informationen zur Speicherdauer findest du – falls abweichend von
          diesem Abschnitt – innerhalb der jeweiligen Kapitel dieser
          Datenschutzerklärung.
        </p>
        <p className="_title">
          Registrierung, dein eTicket-Profil & Kommentarfunktion
        </p>
        <p className="_text">
          Du hast die Möglichkeit, dich auch mit einem eigenen Profil bei den
          eTicket-Services („eTicket-Profil“) zu registrieren. Wenn du ein
          eTicket-Profil eröffnest, erhältst du eine Bestätigungsemail mit einem
          Aktivierungslink. Erst nach deiner Bestätigung wird dein Account
          aktiv.
        </p>
        <p className="_text">
          Ein eTicket-Profil ermöglicht dir verschiedene Komfort-Funktionen wie
          etwa einen beschleunigten Zahlungsvorgang oder Einblick in deine
          Orderhistorie, ist aber für die Nutzung der Basis-Funktionen der
          eTicket-Services nicht notwendig.
        </p>
        <p className="_text">
          Außerdem ermöglicht uns dein eTicket-Profil dich, im Falle von
          wichtigen Änderungen (z.B. beim Angebotsumfang oder bei technisch
          notwendigen Änderungen), über die von dir angegebene E-Mail-Adresse zu
          kontaktieren.
        </p>
        <p className="_highlighted">Registrierung</p>
        <p className="_text">
          Mit deiner Registrierung und der Aktivierung deines eTicket-Profils
          schließt du einen kostenlosen Nutzungsvertrag mit den eTicket-Services
          ab. Daten, die du zur Vervollständigung deines Profils an uns
          übermittelst, indem du sie in deinem Profil anlegst, bleiben bis zu
          dem Zeitpunkt, an dem du dein Profil bei uns löscht, bei uns
          gespeichert.
        </p>
        <p className="_text">
          Die Verarbeitung deiner Daten erfolgt dann auf der Rechtsgrundlage der
          Vertragserfüllung (siehe auch DSGVO, Art. 6 (1) b)) um dir die
          erweiterten Funktionen der eTicket-Services zur Verfügung stellen zu
          können (Nutzungsvertrag).
        </p>
        <p className="_text">
          Die Löschung deines eTicket-Profils kannst du jederzeit innerhalb
          deines eTicket-Profils vornehmen, alternativ kannst du uns die
          Löschung durch eine Information per E-Mail oder Post an die hier
          genannte, verantwortliche Stelle, mitteilen. Mit der Löschung deines
          eTicket-Profils werden auch alle deine Daten bei uns gelöscht, soweit
          andere rechtliche Regelungen dieser Löschung nicht entgegenstehen (das
          bedeutet, dass wir bestimmte Daten, z.B. Rechnungen, so lange
          aufbewahren müssen, bis die entsprechenden rechtlichen Fristen dafür
          abgelaufen sind).
        </p>
        <p className="_highlighted">Hinweis zur Kommentarfunktion</p>
        <p className="_text">
          Für die Kommentarfunktion der eTicket-Services speichern wir neben
          deinem Kommentar auch Angaben zum Zeitpunkt der Erstellung deines
          Kommentars, deine E-Mail-Adresse und deinen Vor- und Nachnamen.
        </p>
        <p className="_text">
          Unsere Kommentarfunktion speichert die IP-Adressen der Nutzer, die
          Kommentare verfassen. Da wir Kommentare auf dieser Website nicht vor
          der Freischaltung prüfen, benötigen wir diese Daten, um im Falle von
          Rechtsverletzungen wie Beleidigungen oder Propaganda gegen den
          Verfasser vorgehen zu können.
        </p>
        <p className="_text">
          Mit einem eTicket-Profil kannst du nach einer Anmeldung Kommentare
          abonnieren. Du erhältst eine Bestätigungsemail, um deine Anfrage zu
          prüfen. Natürlich kannst du diese Funktion jederzeit über einen Link
          in den Info-Mails abbestellen. Die im Rahmen des Abonnierens von
          Kommentaren eingegebenen Daten werden in diesem Fall gelöscht; wenn du
          diese Daten für andere Zwecke und an anderer Stelle (z.B. zur
          Bestellung eines Newsletters) an uns übermittelt hast, verbleiben
          diese Daten bei uns.
        </p>
        <p className="_text">
          Kommentare und damit verbundenen Daten werden gespeichert und
          verbleiben auf dieser Website, bis der kommentierte Inhalt vollständig
          gelöscht wurde oder die Kommentare aus rechtlichen Gründen gelöscht
          werden müssen (z. B. beleidigende Kommentare). Die Speicherung deiner
          Kommentare erfolgt dabei auf Grundlage deiner Einwilligung.
        </p>
        <p className="_title">Kauf & Zahlungen</p>
        <p className="_text">
          Du kannst ohne eTicket-Profil (als „Gast“) oder als registrierter
          Nutzender (mit eTicket-Profil) im Rahmen der Nutzung der
          eTicket-Services Tickets und damit verbundene Leistungen kaufen.{" "}
        </p>
        <p className="_text">
          Wenn du entsprechende Leistungen kaufst, verarbeiten wir,
          Verkäufer/innen sowie Zahlungsdienste deine personenbezogenen Daten
          und u.U. weitere Daten Dritter, die du im Rahmen des Bestellprozesses
          an uns übermittelst. Bitte achte darauf, dass – falls du die Daten
          Dritter im Rahmen deiner Bestellung angibst (z.B. eine abweichende
          Lieferadresse), diese Dritte über die Datenweitergabe und die
          Verarbeitung Ihrer Daten informierst und du zur Übermittlung der Daten
          berechtigt bist.
        </p>
        <p className="_highlighted">Pflichtfelder</p>
        <p className="_text">
          Daten, die zur Abwicklung deines Kaufs notwendig sind und die du
          angeben musst, werden von uns als Pflichtfeld gekennzeichnet. Weitere
          Daten kannst du optional angeben, falls du dies als notwendig
          erachtest. Wir bemühen uns, sämtliche Verarbeitungen im Zusammenhang
          mit deinen Bestellungen auf ein Minimum zu reduzieren, daher kannst du
          deine Bestellung auch nur mit deinem Namen, deiner E-Mail-Adresse und
          einer Zahlungsmöglichkeit durchführen.
        </p>
        <p className="_highlighted">Information zur Verarbeitung</p>
        <p className="_text">
          Ohne die Angabe dieser Daten, können wir der Vertragserfüllung nicht
          nachkommen und deinen Kauf nicht abschließen. Die Verarbeitung ist
          notwendig um der Vertragserfüllung dir gegenüber nachzukommen (siehe
          auch DSGVO, Art. 6 (1) b)).{" "}
        </p>
        <p className="_text">
          Daten zu deinen Käufen speichern wir nach den rechtlich geltenden
          Vorgaben (in der Regel handels- und steuerrechtliche Vorgaben). Nach
          Ablauf der entsprechenden Fristen werden deine Daten automatisch
          gelöscht.
        </p>
        <p className="_highlighted">
          Datenweitergabe im Rahmen der Zahlungsabwicklung
        </p>
        <p className="_text">
          Zur Abwicklung deiner Zahlung werden deine Zahlungsdaten sowie weitere
          personenbezogene Daten (z.B. dein Vorname und Nachname) an den von dir
          ausgewählten Zahlungsdienstleister weitergegeben. Eine Übersicht mit
          den von uns angebotenen Zahlungsdienstleistern findest du in diesen
          Datenschutzhinweisen.
        </p>
        <p className="_title">
          Verhältnis zwischen Verkäufer/innen und eTicket
        </p>
        <p className="_text _highlithted">Verkäufer/innen</p>
        <p className="_text">
          Verkäufer/innen sind solche Unternehmen und / oder Einzelpersonen, die
          über die eTicket-Services an dich Tickets und weitere Leistungen
          verkaufen. Diese Unternehmen bzw. Einzelpersonen benötigen deine
          Daten, um dir die entsprechenden Leistungen anbieten zu können.
        </p>
        <p className="_text">
          Die eTicket-Services sind folgendermaßen strukturiert: wir
          (eTicket-Services) stellen Verkäufer/innen von Tickets und weiteren
          Leistungen die entsprechende Infrastruktur zur Verfügung. Mit den
          eTicket-Services ist es also anderen Unternehmen und Einzelpersonen
          möglich, über ihre Leistungen zu informieren und an dich zu verkaufen.
        </p>
        <p className="_text">
          Im Rahmen dieser Zusammenarbeit erheben wir personenbezogene Daten von
          dir (siehe Abschnitt „Um welche Daten geht es“). Dabei werden gleiche
          Daten von uns und den Verkäufer/innen zu unterschiedlichen Zwecken
          verarbeitet.{" "}
        </p>
        <p className="_text">
          Deine E-Mail-Adresse nutzen wir z.B. um dein eTicket-Profil
          einzurichten. Unsere Verkäufer/innen nutzen deine E-Mail-Adresse z.B.
          um dir deine Tickets oder eine Rechnung zuzusenden.
        </p>
        <p className="_text">
          Ein weiteres Beispiel: aus den Verkäufen von Tickets erstellen wir
          automatisiert und anonymisiert Statistiken (z.B. wie viele Tickets
          wurden an welchem Tag für eine Veranstaltung verkauft). Diese
          Statistik stellen wir unseren Verkäufer/innen zur Verfügung.
        </p>
        <p className="_text">
          eTicket achtet dabei immer auf Datensparsamkeit und anonymisiert Daten
          wo möglich.
        </p>
        <p className="_text">
          Der Austausch deiner Daten zwischen uns und unseren Verkäufer/innen
          beruht dabei auf einer sogenannten „gemeinsamen Verantwortlichkeit“.
          Sowohl eTicket als auch unsere Verkäufer/innen sind also für die
          Verarbeitung und Sicherheit verantwortlich (siehe dazu auch Art. 26
          DSGVO).
        </p>
        <p className="_text _highlighted">Anfragen zu deinen Daten</p>
        <p className="_text">
          Bei Anfragen zu deinen Daten (Löschung, Einschränkung, Auskunft,
          Widerspruch etc.) wende dich gerne direkt an uns, wir leiten deine
          Anfrage an die entsprechenden Verkäufer/innen weiter und stellen so
          eine zügige Bearbeitung deiner Anfrage sicher.
        </p>
        <p className="_text _highlighted">Analysten</p>
        <p className="_text">
          Analysten sind solche Unternehmen, die wir benötigen, um die
          eTicket-Services statistisch auszuwerten und auf Basis gesammelter
          Nutzungsdaten zu verbessern.
        </p>
        <p className="_text">
          Die Analyse deiner Nutzungsdaten durch das Hinzuziehen von Analysten
          unterliegt nicht der gemeinsamen datenschutzrechtlichen Verantwortung.
          Für diese Verarbeitung ist allein eTicket verantwortlich.
        </p>
        <p className="_title">An wen werden deine Daten weitergegeben?</p>
        <p className="_text">
          Grundsätzlich bemühen wir uns, deine Daten an so wenig Dritte wie
          möglich weiterzugeben. Wir unterschieden dabei drei Kategorien:
        </p>
        <p className="_text">
          <span className="_bolded">Verkäufer/innen:</span> sind solche
          Unternehmen und / oder Einzelpersonen, die über die eTicket-Services
          an dich Tickets und weitere Leistungen verkaufen. Diese Unternehmen
          bzw. Einzelpersonen benötigen deine Daten, um dir die entsprechenden
          Leistungen anbieten zu können.
        </p>
        <p className="_text">
          <span className="_bolded">Zahlungsdienstleister:</span>
          sind solche Unternehmen, die es dir ermöglichen, deine Tickets und
          weitere Leistungen der eTicket-Services zu bezahlen.
        </p>
        <p className="_text">
          <span className="_bolded">Technische Dienstleister:</span>sind solche
          Unternehmen, die wir benötigen, um dir die eTicket-Services anbieten
          zu können.
        </p>
        <p className="_text">
          <span className="_bolded">Analysten:</span>
          sind solche Unternehmen, die wir benötigen, um die eTicket-Services
          statistisch auszuwerten und auf Basis gesammelter Nutzungsdaten zu
          verbessern.
        </p>
        <p className="_highlighted">Datenweitergaben im Detail:</p>
        <Table striped bordered className="text-start">
          <thead>
            <tr>
              <td>Kategorie</td>
              <td>Details</td>
              <td>Zweck</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Verkäufer/innen</td>
              <td>
                Informationen über deine Verkäufer/innen kannst du der
                jeweiligen Event-Seite entnehmen. Diese können sich von
                Veranstaltung zu Veranstaltung unterscheiden.
              </td>
              <td>Vertragserfüllung</td>
            </tr>
            <tr>
              <td rowSpan={5}>Zahlungsdienstleister</td>
              <td>
                PayPal (Europe) S.à r.l. et Cie, S.C.A. 22-24 Boulevard Royal
                L-2449 Luxembourg{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://www.paypal.com/myaccount/privacy/privacyhub"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Zahlungen</td>
            </tr>
            <tr>
              <td>
                Stripe Payments Europe, Limited (SPEL) 1 Grand Canal Street
                Lower Grand Canal Dock Dublin D02 H210 Irland{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://stripe.com/de/privacy"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Zahlungen</td>
            </tr>
            <tr>
              <td>
                Apple Pay Apple Distribution International Ltd. Hollyhill
                Industrial Estate Hollyhill, Cork Republic of Ireland{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://www.apple.com/de/privacy/"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Zahlungen</td>
            </tr>
            <tr>
              <td>
                Google Pay Google Ireland Limited Gordon House Barrow Street
                Dublin 4 Irland{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://safety.google/intl/de_de/pay/"
                >
                  Weitere Informationen
                </a>
              </td>
            </tr>
            <tr>
              <td>
                Klarna Klarna Bank AB (publ.) Sveavagen 46 111 34 Stockholm
                Schweden{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://www.klarna.com/de/datenschutz/"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Zahlungen</td>
            </tr>
            <tr>
              <td rowSpan={5}>Technische Dienstleister</td>
              <td>
                Amazon Web Services, Inc. P.O. Box 81226 Seattle WA 98108-1226{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://aws.amazon.com/de/privacy/?nc1=f_pr"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Hosting</td>
            </tr>
            <tr>
              <td>
                Cloudflare Germany GmbH Rosental 7 c/o Mindspace 80331 München{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://www.cloudflare.com/privacypolicy/"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Sicherheit</td>
            </tr>
            <tr>
              <td>
                Rapidmail rapidmail GmbH Wentzingerstraße 21 79106 Freiburg im
                Breisgau{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://www.rapidmail.de/datenschutz"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Messaging</td>
            </tr>
            <tr>
              <td>
                Google OAuth Google Ireland Limited Gordon House Barrow Street
                Dublin 4 Irland{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://safety.google/intl/de_de/pay/"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Sign-In</td>
            </tr>
            <tr>
              <td>
                Apple Authentification Apple Distribution International Ltd.
                Hollyhill Industrial Estate Hollyhill, Cork Republic of Ireland{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://www.apple.com/de/privacy/"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Sign-In</td>
            </tr>
            <tr>
              <td rowSpan={2}>Analysten</td>
              <td>
                Meta Meta Platforms Ireland Limited Merrion Road Dublin 4 D04
                X2K5 Irland{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://www.facebook.com/privacy/policy/"
                >
                  Weitere Informationen
                </a>
              </td>
              <td>Meta Pixel</td>
            </tr>
            <tr>
              <td>
                Google Google Ireland Limited Gordon House Barrow Street Dublin
                4 Irland{" "}
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://safety.google/intl/de_de/pay/"
                >
                  Weitere Informationen
                </a>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <p className="_title">An wen kannst du dich bei Fragen wenden?</p>
        <p className="_text">
          Verantwortliche Stelle für die Verarbeitung deiner personenbezogenen
          Daten ist:
        </p>
        <p className="_text _highlighted">eGuest & ePassGo GmbH</p>
        <p className="_text">Vertreten durch die Geschäftsführer:</p>
        <ul className="_text">
          <li>Oliver Diederichs</li>
          <li>Andreas Richter</li>
        </ul>
        <p className="_text">Nachbars Wiesenweg 55</p>
        <p className="_text">38820 Halberstadt</p>
        <p className="_text">
          Du erreichst die uns bei Fragen rund um deine personenbezogenen Daten
          unter: <span className="_underlined">datenschutz@my-eticket.de</span>{" "}
        </p>
        <p className="_text">
          Verantwortliche Stelle bezeichnet die natürliche oder juristische
          Person, die allein oder gemeinsam mit anderen über die Zwecke und
          Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen,
          E-Mail-Adressen o. Ä.) entscheidet.
        </p>
        <div className="_title">
          Technische Daten, Bereitstellung unserer Dienste sowie Analysten
        </div>
        <p className="_text">
          Neben den beschriebenen, direkt auf deine Person bezogenen Daten,
          erheben wir auch Daten, die für den Betrieb der eTicket-Services
          notwendig sind. Rufst du die mit unseren Services verbundenen Seiten
          oder Apps auf, werden automatisch Informationen von deinem Endgerät
          (z.B. Smartphone, Laptop etc.) erfasst.
        </p>
        <p className="_text">
          Diese Daten sind vor allem technischer Natur, sind also notwendig, um
          dir unsere Services anzeigen und Funktionen wie z.B. den Bezahlvorgang
          abwickelt zu können sowie um den sicheren Betrieb der eTicket-Services
          gewährleisten zu können.
        </p>
        <p className="_text _highlighted">
          Dabei werden folgende Daten erhoben:
        </p>
        <ul className="_text">
          <li>IP-Adresse</li>
          <li>Verwendeter Browser, Version, Sprache</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer-Adresse falls gesendet</li>
          <li>Datum & Uhrzeit deiner Nutzung der eTicket-Services</li>
          <li>Übertragene Datenmenge</li>
        </ul>
        <p className="_text">
          Diese Daten können auch in sicherheitsrelevanten Logfiles gespeichert
          werden, die auf Serverebene erfasst werden.
        </p>
        <p className="_text _highlighted">Warum erheben wir diese Daten?</p>
        <p className="_text">
          Die Rechtsgrundlage für diese Verarbeitung ist das sogenannte
          „berechtigte Interesse“, siehe auch DSGVO, Art. 6 (1) f). Der Zweck
          der Verarbeitung ist das Bereitstellen der eTicket-Services sowie die
          Gewährleistung von Stabilität und Sicherheit unserer Infrastruktur.
        </p>
        <p className="_text">
          Deine Daten werden gelöscht, sobald du die Nutzung der
          eTicket-Services beendest, wenn es sich rein um Daten zur
          Bereitstellung der eTicket-Services handelt. Logfiles werden nach 3
          Monaten gelöscht soweit keine gesetzlichen Aufbewahrungspflichten
          längere Aufbewahrungsfristen erfordern.
        </p>
        <p className="_text _highlighted">Analysten</p>
        <p className="_text">
          Um unsere eTicket-Services verbessern zu können, ist es für uns als
          Unternehmen wichtig, mehr über die Art und Weise der Nutzung unserer
          Services durch deine Besuche zu erfahren. Um diese Daten auswerten zu
          können, setzen wir Analyse-Tools ein (z.B. Google Analytics). Diese
          Tools erlauben uns z.B. nachzuvollziehen, welche Handlungen du
          ausführst, welche (Unter-)Seiten du aufrufst und wie lange du dich auf
          bestimmten Seiten aufhältst
        </p>
        <p className="_text">
          Diese Analyse-Funktionen werden erst dann aktiv, wenn du dein
          Einverständnis dazu erteilst (also im Consent Manager bzw. in deiner
          Auswahl von Cookies) diese Dienste aktiv zulässt. Die Rechtsgrundlage
          dafür stellt deine Einwilligung dar (siehe dazu DSGVO, Art. 6 (1) a)).
        </p>
        <p className="_title">Sicherheit deiner Daten</p>
        <p className="_text">
          Wir geben uns größte Mühe, deine Daten nicht nur nach geltenden
          Vorschriften zu verarbeiten, sondern auch die Sicherheit deiner Daten
          zu gewährleisten. Unsere wichtigsten Sicherheitsmaßnahmen im
          Überblick:
        </p>
        <p className="_text _highlighted">
          Mit eTicket-Services verbundene Dienste & Dienstleister
        </p>
        <p className="_text">
          Wir wählen Diensteanbieter und Dienstleister nach strengen Kriterien
          aus. Um die Sicherheit deiner Daten zu gewährleisten, schließen wir
          entsprechende Verträge zur Verarbeitung im Auftrag ab. Speziell
          Unternehmen aus dem US-Raum werden von uns nur ausgewählt, wenn sie am
          Data Privacy Framework Program (
          <a
            href="https://www.dataprivacyframework.gov/s/"
            rel="noreferrer"
            target={"_blank"}
          >
            Weitere Informationen
          </a>
          ) teilnehmen, entsprechend zertifiziert sind oder sich durch weitere
          Kriterien auszeichnen. Zu diesen Unternehmen gehören:
        </p>
        <ul className="_text">
          <li>Stripe Payments</li>
          <li>Amazon Web Services</li>
          <li>Cloudflare Inc.</li>
          <li>Google LLC</li>
        </ul>
        <p className="_text">
          Weitere Dienste befinden sich in Deutschland oder dem europäischen
          Wirtschaftsraum und unterliegen damit den strengen Anforderungen der
          DSGVO. Zu diesen Unternehmen gehören:
        </p>
        <ul className="_text">
          <li>eGuest & ePassGo GmbH</li>
          <li>PayPal</li>
          <li>Apple</li>
          <li>Klarna</li>
          <li>Rapidmail</li>
          <li>Meta</li>
        </ul>
        <p className="_text">
          Sollten wir Dienste wechseln und dies auch die Verarbeitung deiner
          personenbezogenen Daten betreffen, informieren wir dich rechtzeitig.{" "}
        </p>
        <p className="_text">
          Hinweis Zahlungsdienste: wir stellen dir verschiedene
          Zahlungsmöglichkeiten zur Verfügung. Wenn du einem unserer
          Zahlungsdienste deine Daten nicht anvertrauen möchtest, wähle den aus,
          der für dich in Ordnung ist. Wir bemühen uns, dir langfristig noch
          weitere Möglichkeiten für Zahlungsaktivitäten anbieten zu können.
        </p>
        <p className="_text _highlighted">Datenübertragung & Verschlüsselung</p>
        <p className="_text">
          Daten, die du mit den eTicket-Services tauschst oder den
          eTicket-Services zur Verfügung stellst, werden grundsätzlich zwischen
          dir und unseren Servern verschlüsselt übertragen. Die Verschlüsselung
          basiert dabei auf den aktuellen Industriestandards (sog. SSL bzw. TLS
          Verschlüsselung)
        </p>
        <p className="_text">
          Daten, die du im Rahmen der Nutzung der eTicket-Services von uns
          speichern lässt (z.B. deine Bestelldaten), werden von uns bereits auf
          Datenbank-Ebene verschlüsselt. Dabei werden deine Daten in dem
          verschlüsselt, in dem sie final gespeichert werden (sog. „Encryption
          at rest“).
        </p>
        <p className="_text _highlighted">Verschlüsselter Zahlungsverkehr</p>
        <p className="_text">
          Möchtest du deinen Einkauf bezahlen und daraus ergibt sich eine
          Verpflichtung, deine Zahlungsdaten (z.B. deine PayPal-E-Mail-Adresse)
          zu übermitteln, findet diese Übermittlungen ausschließlich über
          verschlüsselte SSL- bzw. TLS-Verbindungen statt. Dadurch können – bei
          verschlüsselter Kommunikation – deine Zahlungsdaten, nicht von Dritten
          mitgelesen werden.
        </p>
        <p className="_text _highlighted">Zugangssicherheit</p>
        <p className="_text">
          Dein eTicket-Services Passwort wird nach aktuellen Industriestandards
          verschlüsselt und damit sicher gespeichert. Zusätzlich lassen wir nur
          Passwörter zu, die speziellen Anforderungen genügen (u.a. mindestens 8
          Zeichen lang, Sonderzeichen, Zahlen usw.). Um deinen Account weiter
          abzusichern, hast du die Möglichkeit, eine 2-Faktor-Authentifizierung
          zu nutzen (
          <a
            href="https://de.wikipedia.org/wiki/Zwei-Faktor-Authentisierung"
            rel="noreferrer"
            target={"_blank"}
          >
            Weitere Informationen
          </a>
          ).
        </p>
        <p className="_text _highlighted">
          Serverbasierte Sicherheitsmaßnahmen
        </p>
        <p className="_text">
          Um die eTicket-Services generell gegen Angriffe von außen abzusichern
          und damit einen wesentlichen Teil zum Schutz deiner Daten beizutragen,
          sichern wir unsere eTicket-Services zusätzlich durch Maßnahmen wie
          Rate Limiting sowie Maßnahmen zum Schutz vor z.B. DDoS-Attacken,
          Cross-Site Requests, Cross-Site-Scripting etc. ab.
        </p>
        <p className="_text _highlighted">Sichere APIs</p>
        <p className="_text">
          APIs kannst du dir als Schnittstelle zwischen verschiedenen
          Programmbestandteilen vorstellen. Hier ist es besonders wichtig, dass
          Unberechtigte keinen Zugriff erlangen können. Darum beschränken wir
          API-Zugriffe auf ein Minimum und achten darauf, nur dort
          Zugriffsmöglichkeiten einzuräumen, wo diese auch wirklich benötigt
          werden.
        </p>
        <p className="_text _highlighted">Regelmäßige Updates</p>
        <p className="_text">
          Sowohl unsere eTicket-Services Dienste als auch die dafür genutzten
          Server werden regelmäßig mit Sicherheits-Updates versorgt um dir
          sowohl einen stabilen Betrieb als auch möglichst hohe
          Sicherheitsstandards bieten zu können.
        </p>
        <p className="_title">Deine Rechte bzgl. deiner Daten</p>
        <p className="_text">
          Du hast jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
          Empfänger und Zweck deiner gespeicherten personenbezogenen Daten zu
          erhalten. Du hast außerdem das Recht, die Berichtigung oder Löschung
          dieser Daten zu verlangen. Wenn du eine Einwilligung zur
          Datenverarbeitung erteilt hast, kannst du diese Einwilligung jederzeit
          für die Zukunft widerrufen. Du hast das Recht, unter bestimmten
          Umständen die Einschränkung der Verarbeitung deiner personenbezogenen
          Daten zu verlangen. Des Weiteren steht dir ein Beschwerderecht bei der
          zuständigen Aufsichtsbehörde zu.
        </p>
        <p className="_text _highlighted">
          Dein Recht, deine Einwilligung zu widerrufen
        </p>
        <p className="_text">
          Hast du zu einer Datenverarbeitung im Rahmen der eTicket-Services
          deine Einwilligung erteilt, kannst du diese Einwilligung jederzeit für
          die Zukunft widerrufen. Wir verarbeiten dann keine weiteren Daten mehr
          im Rahmen der Verarbeitung, die du widerrufen hast. Die Rechtmäßigkeit
          der Verarbeitung deiner Daten bis zu deinem Widerruf bleibt davon
          unberührt.
        </p>
        <p className="_text _highlighted">
          Dein Widerspruchsrecht (Art. 21 DSGVO)
        </p>
        <p className="_text">
          Erfolgt die Verarbeitung deiner Daten auf Basis von DSGVO Art. 6 Abs.
          (1) e) oder f), hast du jederzeit das Recht auf Basis der Gründe
          deiner besonderen Situation, gegen die Verarbeitung deiner
          personenbezogenen Daten Widerspruch einzulegen. Dies gilt auch für ein
          Profiling, das sich auf diese Bestimmungen stützt. Wenn du Widerspruch
          einlegst, verarbeiten wir die von deinem Widerspruch betroffenen,
          personenbezogenen Daten nicht mehr weiter, außer auf unserer Seite
          bestehen zwingende, schutzwürdige Gründe, die wir für die weitere
          Verarbeitung nachweisen können. Diese Gründe müssen deine Rechte,
          Interessen und Freiheiten überwiegen. Alternativ kann die weitere
          Verarbeitung auch der Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen unsererseits dienen.
        </p>
        <p className="_text">
          Im Falle einer Verarbeitung im Zusammenhang mit Direktwerbung kannst
          du dieser Verarbeitung jederzeit widersprechen, dies gilt auch für
          Profiling, falls es mit dieser Direktwerbung in Verbindung steht. Eine
          weitere Verarbeitung deiner Daten findet dann nicht mehr statt.
        </p>
        <p className="_text _highlighted">Dein Beschwerderecht</p>
        <p className="_text">
          Falls du einen Verstoß gegen die DSGVO unsererseits vermutest, kannst
          du dich bei einer Aufsichtsbehörde beschweren. Dein Beschwerderecht
          besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
          gerichtlicher Rechtsbehelfe. Eine Übersicht der Aufsichtsbehörden in
          Deutschland findest du auf der Website des Bundesbeauftragten für
          Datenschutz und die Informationsfreiheit (
          <a
            href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html"
            rel="noreferrer"
            target={"_blank"}
          >
            bfdi.bund.de
          </a>
          ).
        </p>
        <p className="_text _highlighted">
          Dein Recht auf Datenübertragbarkeit
        </p>
        <p className="_text">
          Du hast das Recht, personenbezogene Daten, die wir auf Grundlage
          deiner Einwilligung oder zur Vertragserfüllung automatisiert
          verarbeiten, an dich oder an einen Dritten in einem gängigen,
          maschinenlesbaren Format aushändigen zu lassen. Sofern du die direkte
          Übertragung der Daten an einen anderen Verantwortlichen verlangst,
          erfolgt dies nur, soweit es technisch machbar ist.
        </p>
        <p className="_text _highlighted">
          Dein Recht auf Auskunft, Löschung und Berichtigung
        </p>
        <p className="_text">
          Im Rahmen der geltenden gesetzlichen Bestimmungen hast du jederzeit
          das Recht auf unentgeltliche Auskunft über deine bei uns gespeicherten
          personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
          der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder
          Löschung deiner Daten. Wende dich dazu gerne direkt an die
          E-Mail-Adresse{" "}
          <span className="_underlined">auskunft@my-eticket.de</span>.
        </p>
        <p className="_text">
          Dein Recht auf Einschränkung der Verarbeitung deiner Daten
        </p>
        <p className="_text _highlighted">
          Dein Recht auf Einschränkung der Verarbeitung deiner Daten
        </p>
        <p className="_text">
          Du hast das Recht, die Verarbeitung deiner personenbezogenen Daten
          einschränken zu lassen.
        </p>
        <p className="_text">
          Was bedeutet Einschränkung? Wenn du die Verarbeitung deiner
          personenbezogenen Daten eingeschränkt hast, dürfen diese Daten nur mit
          deiner Einwilligung oder zur Geltendmachung, Ausübung oder
          Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer
          anderen natürlichen oder juristischen Person oder aus Gründen eines
          wichtigen öffentlichen Interesses der Europäischen Union oder eines
          Mitgliedstaats verarbeitet werden – abgesehen von der reinen
          Speicherung.
        </p>
        <p className="_text _highlighted">
          Dein Recht auf Einschränkung der Verarbeitung besteht in folgenden
          Fällen:
        </p>
        <ul className="_text">
          <li>
            Wenn du die Richtigkeit deiner bei uns gespeicherten
            personenbezogenen Daten bestreitest, benötigen wir in der Regel
            Zeit, um dies zu überprüfen. Für die Dauer der Prüfung hast du das
            Recht, die Einschränkung der Verarbeitung deiner personenbezogenen
            Daten zu verlangen.
          </li>
          <li>
            Findet die Verarbeitung deiner personenbezogenen Daten unrechtmäßig
            statt (in der Vergangenheit oder aktuell), kannst du statt einer
            Löschung auch die Einschränkung der Datenverarbeitung verlangen.
          </li>
          <li>
            Wenn wir deine personenbezogenen Daten nicht mehr benötigen, du sie
            jedoch zur Ausübung, Verteidigung oder Geltendmachung von
            Rechtsansprüchen benötigst, hast du das Recht, statt der Löschung
            die Einschränkung der Verarbeitung deiner personenbezogenen Daten zu
            verlangen.
          </li>
          <li>
            Wenn du einen Widerspruch nach DSGVO Art. 21 (1) DSGVO eingelegt
            hast, muss eine Abwägung zwischen deiner und unseren Interessen
            vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
            überwiegen, hast du ebenfalls das Recht, die Einschränkung der
            Verarbeitung deiner personenbezogenen Daten zu verlangen.
          </li>
        </ul>
        <p className="_title">Anfragen & Kontaktformulare</p>
        <p className="_text _highlighted">Kontaktformular</p>
        <p className="_text">
          Schickst du uns eine Nachricht über eines der von den eTicket-Services
          zur Verfügung gestellten Kontaktformulare, speichern wir deine Angaben
          inklusive der von dir dort angegebenen Kontaktdaten um deine Anfrage
          bearbeiten zu können und um mögliche Anschlussfragen beantworten zu
          können. Diese Daten geben wir nicht ohne deine Einwilligung weiter.
        </p>
        <p className="_text">
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
          lit. b DSGVO, sofern deine Anfrage mit der Erfüllung eines Vertrags
          zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
          erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf
          unserem berechtigten Interesse an der effektiven Bearbeitung der an
          uns gerichteten Anfragen (siehe dazu DSGVO Art. 6 (1) f)).
        </p>
        <p className="_text">
          Die von dir im Kontaktformular eingegebenen Daten verbleiben bei uns,
          bis du uns zur Löschung aufforderst oder der Zweck für die
          Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
          deiner Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere
          Aufbewahrungsfristen – bleiben davon unberührt.
        </p>
        <p className="_text _highlighted">Anfrage per E-Mail oder Telefon</p>
        <p className="_text">
          Wenn du uns per E-Mail oder Telefon kontaktierst, wird deine Anfrage
          inklusive aller daraus hervorgehenden personenbezogenen Daten (Name,
          Anfrage) zum Zwecke der Bearbeitung deines Anliegens bei uns
          gespeichert und verarbeitet. Diese Daten geben wir nicht ohne deine
          Einwilligung weiter.
        </p>
        <p className="_text">
          Die Verarbeitung deiner Daten erfolgt auf Grundlage von DSGVO Art. 6
          (1) b), sofern deine Anfrage mit der Erfüllung eines Vertrags
          zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
          erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf
          unserem berechtigten Interesse an der effektiven Bearbeitung der an
          uns gerichteten Anfragen (siehe dazu DSGVO Art. 6 (1) f)).
        </p>
        <p className="_text">
          Die von dir im Kontaktformular eingegebenen Daten verbleiben bei uns,
          bis du uns zur Löschung aufforderst oder der Zweck für die
          Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
          deiner Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere
          Aufbewahrungsfristen – bleiben davon unberührt.
        </p>
        <p className="_title">Newsletter</p>
        <p className="_text">
          Wenn du Newsletter der eTicket-Services beziehen möchtest, benötigen
          wir deine E-Mail-Adresse sowie Informationen, welche es uns möglich
          machen, dass du wirklich der Inhaber der angegebenen E-Mail-Adresse
          bist und mit dem Empfang des Newsletters einverstanden bist. Weitere
          Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese
          Daten verwenden wir ausschließlich für den Versand der angeforderten
          Informationen und geben diese nicht an Dritte weiter.
        </p>
        <p className="_text">
          Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen
          Daten erfolgt ausschließlich auf Grundlage deiner Einwilligung. Ein
          Widerruf deiner Einwilligung ist jederzeit für die Zukunft möglich,
          z.B. über den „Austragen“-Link, den du im Fußbereich unserer
          Newsletter findest.
        </p>
        <p className="_text">
          Die von dir zum Zwecke des Newsletter-Bezugs bei uns hinterlegten
          Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter bei
          uns bzw. dem Newsletterdiensteanbieter gespeichert und nach der
          Abbestellung des Newsletters oder nach Zweckfortfall aus der
          Newsletterverteilerliste gelöscht. Wir behalten uns vor,
          E-Mail-Adressen aus unserem Newsletterverteiler nach eigenem Ermessen
          im Rahmen unseres berechtigten Interesses (siehe dazu DSGVO Art. 6 (1)
          f)) zu löschen oder zu sperren.
        </p>
        <p className="_text">
          Daten von dir, die zu anderen Zwecken bei uns gespeichert wurden,
          bleiben hiervon unberührt.
        </p>
        <p className="_text">
          Nach deiner Austragung aus der Newsletterverteilerliste wird deine
          E-Mail-Adresse bei uns bzw. dem Newsletterdiensteanbieter ggf. in
          einer Blacklist gespeichert, sofern dies zur Verhinderung künftiger
          Mailings erforderlich ist. Die Daten aus der Blacklist werden nur für
          diesen Zweck verwendet und nicht mit anderen Daten zusammengeführt.
          Dies dient sowohl deinem Interesse als auch unserem berechtigten
          Interesse an der Einhaltung der gesetzlichen Vorgaben beim Versand von
          Newslettern. Die Speicherung in der Blacklist ist zeitlich nicht
          befristet. Du kannst der Speicherung widersprechen, sofern deine
          Interessen unser berechtigtes Interesse überwiegen.
        </p>
        <p className="_title">
          Detaillierte Informationen zu den von uns betrauten Zahlungsdiensten
        </p>
        <p className="_text">
          Wir binden Zahlungsdienste von Drittunternehmen auf unserer Website
          ein. Kaufst du im Rahmen der eTicket-Services z.B. dein Ticket, werden
          deine Zahlungsdaten vom Zahlungsdienstleister zum Zwecke der
          Zahlungsabwicklung verarbeitet. Für diese Transaktionen gelten die
          jeweiligen Vertrags- und Datenschutzbestimmungen der jeweiligen
          Anbieter. Der Einsatz der Zahlungsdienstleister erfolgt auf Grundlage
          von DSGVO Art. 6 Abs. (1) b) sowie im Interesse eines möglichst
          reibungslosen, komfortablen und sicheren Zahlungsvorgangs (Art. 6 (1)
          f) DSGVO). Soweit für bestimmte Handlungen Ihre Einwilligung abgefragt
          wird, ist Art. 6 Abs. 1 lit. a DSGVO Rechtsgrundlage der
          Datenverarbeitung.
        </p>
        <p className="_text">
          Folgende Zahlungsdienste / Zahlungsdienstleister setzen wir im Rahmen
          der eTicket-Services ein:
        </p>
        <p className="_text _highlighted">PayPal</p>
        <p className="_text">
          Anbieter dieses Zahlungsdienstes ist PayPal (Europe) S.à.r.l. et Cie,
          S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg (im Folgenden
          „PayPal“). Die Datenübertragung in die USA wird auf die
          <a
            href="https://www.paypal.com/de/webapps/mpp/ua/pocpsa-full"
            rel="noreferrer"
            target={"_blank"}
          >
            Standardvertragsklauseln
          </a>{" "}
          der EU-Kommission gestützt. Weitere Informationen findest du in der
          <a
            href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
            rel="noreferrer"
            target={"_blank"}
          >
            Datenschutzerklärung
          </a>{" "}
          von PayPal.
        </p>
        <p className="_text _highlighted">Apple Pay</p>
        <p className="_text">
          Anbieter des Zahlungsdienstes ist Apple Inc., Infinite Loop,
          Cupertino, CA 95014, USA. Die Datenschutzerklärung von Apple findest
          du{" "}
          <a
            href="https://www.apple.com/legal/privacy/de-ww/"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>
          .
        </p>
        <p className="_text _highlighted">Google Pay</p>
        <p className="_text">
          Anbieter ist Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland. Die Datenschutzerklärung von Google findest du{" "}
          <a
            href="https://policies.google.com/privacy"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>
          .
        </p>
        <p className="_text _highlighted">Stripe</p>
        <p className="_text">
          Anbieter für Kunden innerhalb der EU ist die Stripe Payments Europe,
          Ltd.,1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland (im
          Folgenden „Stripe“).
        </p>
        <p className="_text">
          Die Datenübertragung in die USA wird auf die{" "}
          <a
            href="https://stripe.com/de/guides"
            rel="noreferrer"
            target={"_blank"}
          >
            Standardvertragsklauseln
          </a>
          der EU-Kommission gestützt. Weitere Informationen findest du in der
          <a
            href="https://stripe.com/de/privacy"
            rel="noreferrer"
            target={"_blank"}
          >
            Datenschutzerklärung
          </a>{" "}
          von Stripe.
        </p>
        <p className="_text _highlighted">Klarna</p>
        <p className="_text">
          Anbieter ist die Klarna AB, Sveavägen 46, 111 34 Stockholm, Schweden
          (im Folgenden „Klarna“). Klarna bietet verschiedene Zahlungsoptionen
          an (z. B. Ratenkauf). Wenn du dich für die Bezahlung mit Klarna
          entscheidest (Klarna-Checkout-Lösung), wird Klarna verschiedene
          personenbezogene Daten von dir erheben. Klarna nutzt Cookies, um die
          Verwendung der Klarna-Checkout-Lösung zu optimieren. Details zum
          Einsatz von Klarna-Cookies findest du{" "}
          <a
            href="https://cdn.klarna.com/1.0/shared/content/policy/cookie/de_de/checkout.pdf"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>
          . Weitere Informationen findest du auch in den{" "}
          <a
            href="https://www.klarna.com/de/datenschutz/"
            rel="noreferrer"
            target={"_blank"}
          >
            Datenschutzhinweisen
          </a>
          von Klarna.
        </p>
        <p className="_title">
          Detaillierte Informationen zu den von uns betrauten Unternehmen
        </p>
        <p className="_text">
          Unter Punkt 7 findest du bereits eine vereinfachte Übersicht der
          Unternehmen, mit denen wir zusammenarbeiten und die teilweise oder
          vollständig an der der Verarbeitung und Speicherung deiner
          personenbezogenen Daten beteiligt sind.
        </p>
        <p className="_text">
          Im folgenden Abschnitt möchten wir dir detaillierte Informationen zu
          diesen Unternehmen an die Hand geben:
        </p>
        <p className="_text _highlighted">Amazon Web Services (AWS)</p>
        <p className="_text">
          Anbieter ist die Amazon Web Services EMEA SARL, 38 Avenue John F.
          Kennedy, 1855 Luxemburg (nachfolgend AWS).
        </p>
        <p className="_text">
          Wenn du unsere Websites oder Apps besuchst, werden deine
          personenbezogenen Daten auf den Servern von AWS verarbeitet. Hierbei
          können auch personenbezogene Daten an das Mutterunternehmen von AWS in
          die USA übermittelt werden. Die Datenübertragung in die USA wird auf
          die{" "}
          <a
            href="https://aws.amazon.com/de/blogs/security/aws-gdpr-data-processing-addendum/"
            rel="noreferrer"
            target={"_blank"}
          >
            EU-Standardvertragsklauseln
          </a>{" "}
          sowie das{" "}
          <a
            href="https://www.dataprivacyframework.gov/s/"
            rel="noreferrer"
            target={"_blank"}
          >
            Data Privacy Framework Program
          </a>{" "}
          gestützt.
        </p>
        <p className="_text">
          Weitere Informationen entnehmen Sie der{" "}
          <a
            href="https://aws.amazon.com/de/privacy/?nc1=f_pr"
            rel="noreferrer"
            target={"_blank"}
          >
            Datenschutzerklärung
          </a>{" "}
          von AWS.
        </p>
        <p className="_text">
          Die Verwendung von AWS erfolgt auf Grundlage von Art. 6 (1) f) DSGVO.
          Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen
          Darstellung der eTicket-Services.
        </p>
        <p className="_text _highlighted">Auftragsverarbeitung</p>
        <p className="_text">
          Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung
          des oben genannten Dienstes geschlossen. Hierbei handelt es sich um
          einen datenschutzrechtlich vorgeschriebenen Vertrag, der
          gewährleistet, dass dieser die personenbezogenen Daten unserer
          Websitebesucher nur nach unseren Weisungen und unter Einhaltung der
          DSGVO verarbeitet.
        </p>
        <p className="_text _highlighted">Cloudflare</p>
        <p className="_text">
          Wir nutzen den Service „Cloudflare“. Anbieter ist die Cloudflare Inc.,
          101 Townsend St., San Francisco, CA 94107, USA (im Folgenden
          „Cloudflare”).
        </p>
        <p className="_text">
          Cloudflare bietet ein weltweit verteiltes Content Delivery Network mit
          DNS an. Dabei wird technisch der Informationstransfer zwischen deinem
          Browser und den eTicket-Services über das Netzwerk von Cloudflare
          geleitet. Das versetzt Cloudflare in die Lage, den Datenverkehr
          zwischen deinem Browser und unserer Website zu analysieren und als
          Filter zwischen unseren Servern und potenziell bösartigem Datenverkehr
          aus dem Internet zu dienen. Hierbei kann Cloudflare auch Cookies oder
          sonstige Technologien zur Wiedererkennung von Internetnutzern
          einsetzen, die jedoch allein zum hier beschriebenen Zweck verwendet
          werden.
        </p>
        <p className="_text">
          Der Einsatz von Cloudflare beruht auf unserem berechtigten Interesse
          an einer möglichst fehlerfreien und sicheren Bereitstellung unseres
          Services (Art. 6 (1) f) DSGVO).
        </p>
        <p className="_text">
          Die Datenübertragung in die USA wird auf die{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            rel="noreferrer"
            target={"_blank"}
          >
            Standardvertragsklauseln
          </a>
          der EU-Kommission gestützt sowie das{" "}
          <a
            href="https://www.dataprivacyframework.gov/s/"
            rel="noreferrer"
            target={"_blank"}
          >
            Data Privacy Framework
          </a>{" "}
          Program gestützt.
        </p>
        <p className="_text">
          Weitere Informationen zum Thema Sicherheit und Datenschutz bei
          Cloudflare finden Sie{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>
          .
        </p>
        <p className="_text _highlighted">Auftragsverarbeitung</p>
        <p className="_text">
          Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung
          des oben genannten Dienstes geschlossen. Hierbei handelt es sich um
          einen datenschutzrechtlich vorgeschriebenen Vertrag, der
          gewährleistet, dass dieser die personenbezogenen Daten unserer
          Websitebesucher nur nach unseren Weisungen und unter Einhaltung der
          DSGVO verarbeitet.
        </p>
        <p className="_text _highlighted">Google Analytics</p>
        <p className="_text">
          Die eTicket-Services nutzen die Funktionen des Webanalysedienstes
          Google Analytics. Anbieter ist die Google Ireland Limited („Google“),
          Gordon House, Barrow Street, Dublin 4, Irland.
        </p>
        <p className="_text">
          Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der
          Websitebesucher zu analysieren. Hierbei erhält der Websitebetreiber
          verschiedene Nutzungsdaten, wie z. B. Seitenaufrufe, Verweildauer,
          verwendete Betriebssysteme und Herkunft des Nutzers. Diese Daten
          werden in einer User-ID zusammengefasst und dem jeweiligen Endgerät
          des Websitebesuchers zugeordnet.
        </p>
        <p className="_text">
          Des Weiteren können wir mit Google Analytics z.B. deine Klicks
          aufzeichnen. Ferner verwendet Google Analytics verschiedene
          Modellierungsansätze, um die erfassten Datensätze zu ergänzen und
          setzt Machine-Learning-Technologien bei der Datenanalyse ein.
        </p>
        <p className="_text">
          Google Analytics verwendet Technologien, die die Wiedererkennung des
          Nutzers zum Zwecke der Analyse des Nutzerverhaltens ermöglichen (z. B.
          Cookies oder Device-Fingerprinting). Die von Google erfassten
          Informationen über die Benutzung dieser Website werden in der Regel an
          einen Server von Google in den USA übertragen und dort gespeichert.
        </p>
        <p className="_text">
          Die Nutzung dieses Dienstes erfolgt auf Grundlage deiner Einwilligung
          (DSGVO sowie TTDSG). Deine Einwilligung ist jederzeit widerrufbar.
        </p>
        <p className="_text">
          Die Datenübertragung in die USA wird auf die{" "}
          <a
            href="https://business.safety.google/adscontrollerterms/sccs/"
            rel="noreferrer"
            target={"_blank"}
          >
            Standardvertragsklauseln
          </a>
          der EU-Kommission sowie das{" "}
          <a
            href="https://www.dataprivacyframework.gov/s/"
            rel="noreferrer"
            target={"_blank"}
          >
            Data Privacy Framework Program
          </a>{" "}
          gestützt. gestützt.
        </p>
        <p className="_text _highlighted">Browser Plugin</p>
        <p className="_text">
          Du kannst die Erfassung und Verarbeitung deiner Daten durch Google
          verhindern, indem du das unter dem
          <a
            href="https://tools.google.com/dlpage/gaoptout?hl=de"
            rel="noreferrer"
            target={"_blank"}
          >
            Browser-Plugin verhindern, indem du das unter dem
          </a>{" "}
          herunterlädst und installierst.
        </p>
        <p className="_text">
          Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics
          findest du in der{" "}
          <a
            href="https://support.google.com/analytics/answer/6004245?hl=de"
            rel="noreferrer"
            target={"_blank"}
          >
            Datenschutzerklärung
          </a>{" "}
          von Google.
        </p>
        <p className="_text _highlighted">Google-Signale</p>
        <p className="_text">
          Wir nutzen Google-Signale. Wenn du unsere Website besuchst, erfasst
          Google Analytics u. a. deinen Standort, Suchverlauf und
          YouTube-Verlauf sowie demografische Daten (Besucherdaten). Diese Daten
          können mit Hilfe von Google-Signal für personalisierte Werbung
          verwendet werden. Wenn du über ein Google-Konto verfügst, werden die
          Besucherdaten von Google-Signal mit deinem Google-Konto verknüpft und
          für personalisierte Werbebotschaften verwendet. Die Daten werden
          außerdem für die Erstellung anonymisierter Statistiken zum
          Nutzerverhalten unserer User verwendet.
        </p>
        <p className="_text _highlighted">
          Google Analytics E-Commerce-Messung
        </p>
        <p className="_text">
          Diese Website nutzt die Funktion „E-Commerce-Messung“ von Google
          Analytics. Mit Hilfe von E-Commerce-Messung kann der Websitebetreiber
          das Kaufverhalten der Websitebesucher zur Verbesserung seiner
          Online-Marketing-Kampagnen analysieren. Hierbei werden Informationen,
          wie zum Beispiel die getätigten Bestellungen, durchschnittliche
          Bestellwerte, Versandkosten und die Zeit von der Ansicht bis zum Kauf
          eines Produktes erfasst. Diese Daten können von Google unter einer
          Transaktions-ID zusammengefasst werden, die dem jeweiligen Nutzer bzw.
          dessen Gerät zugeordnet ist.
        </p>
        <p className="_text _highlighted">Auftragsverarbeitung</p>
        <p className="_text">
          Wir haben mit Google einen Vertrag zur Auftragsverarbeitung
          abgeschlossen und setzen die strengen Vorgaben der deutschen
          Datenschutzbehörden bei der Nutzung von Google Analytics vollständig
          um.
        </p>
        <p className="_text">Google Fonts</p>
        <p className="_text">
          Wir nutzen zur einheitlichen Darstellung von Schriftarten sogenannte
          Google Fonts, die von Google bereitgestellt werden. Die Google Fonts
          sind im Fall der eTicket-Services lokal installiert. Eine Verbindung
          zu Servern von Google findet dabei nicht statt.
        </p>
        <p className="_text">
          Weitere Informationen zu Google Fonts findest du{" "}
          <a
            href="https://developers.google.com/fonts/faq"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>{" "}
          und{" "}
          <a
            href="https://policies.google.com/privacy?hl=de"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>
          .
        </p>
        <p className="_text _highlighted">Meta-Pixel</p>
        <p className="_text">
          Diese Website nutzt zur Konversionsmessung der Besucheraktions-Pixel
          von Facebook/Meta. Anbieter dieses Dienstes ist die Meta Platforms
          Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland. Die erfassten
          Daten werden nach Aussage von Facebook jedoch auch in die USA und in
          andere Drittländer übertragen.
        </p>
        <p className="_text">
          So kann das Verhalten der Seitenbesucher nachverfolgt werden, nachdem
          diese durch Klick auf eine Facebook-Werbeanzeige auf die Website des
          Anbieters weitergeleitet wurden. Dadurch können die Wirksamkeit der
          Facebook-Werbeanzeigen für statistische und Marktforschungszwecke
          ausgewertet werden und zukünftige Werbemaßnahmen optimiert werden.
        </p>
        <p className="_text">
          Die erhobenen Daten sind für uns als Betreiber dieser Website anonym,
          wir können keine Rückschlüsse auf die Identität der Nutzer ziehen. Die
          Daten werden aber von Facebook gespeichert und verarbeitet, sodass
          eine Verbindung zum jeweiligen Nutzerprofil möglich ist und Facebook
          die Daten für eigene Werbezwecke, entsprechend der
          <a
            href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0"
            rel="noreferrer"
            target={"_blank"}
          >
            Facebook-Datenverwendungsrichtlinie
          </a>
          . Dadurch kann Facebook das Schalten von Werbeanzeigen auf Seiten von
          Facebook sowie außerhalb von Facebook ermöglichen. Diese Verwendung
          der Daten kann von uns als Seitenbetreiber nicht beeinflusst werden.
        </p>
        <p className="_text">
          Die Nutzung dieses Dienstes erfolgt auf Grundlage deiner Einwilligung
          (DSGVO und TTDSG). Deine Einwilligung kannst du jederzeit widerrufen.
        </p>
        <p className="_text">
          Wir nutzen die Funktion des erweiterten Abgleichs innerhalb der
          Meta-Pixel.
        </p>
        <p className="_text">
          Der erweiterte Abgleich ermöglicht uns, verschiedene Arten von Daten
          (z. B. Wohnort, Bundesland, Postleitzahl, gehashte E-Mail-Adressen,
          Namen, Geschlecht, Geburtsdatum oder Telefonnummer) unserer Kunden und
          Interessenten, die wir über unsere Website sammeln an Meta (Facebook)
          zu übermitteln. Durch diese Aktivierung können wir unsere
          Werbekampagnen auf Facebook noch präziser auf Personen zuschneiden,
          die sich für unsere Angebote interessieren. Außerdem verbessert der
          erweiterte Abgleich Zuordnung von Webseiten-Conversions und erweitert
          Custom Audiences.
        </p>
        <p className="_text">
          Soweit mit Hilfe des hier beschriebenen Tools personenbezogene Daten
          auf unserer Website erfasst und an Facebook weitergeleitet werden,
          sind wir und die Meta Platforms Ireland Limited, 4 Grand Canal Square,
          Grand Canal Harbour, Dublin 2, Irland gemeinsam für diese
          Datenverarbeitung verantwortlich (siehe dazu Art. 26 DSGVO). Die
          gemeinsame Verantwortlichkeit beschränkt sich dabei ausschließlich auf
          die Erfassung der Daten und deren Weitergabe an Facebook. Die nach der
          Weiterleitung erfolgende Verarbeitung durch Facebook ist nicht Teil
          der gemeinsamen Verantwortung. Die uns gemeinsam obliegenden
          Verpflichtungen wurden in einer Vereinbarung über gemeinsame
          Verarbeitung festgehalten. Den Wortlaut der Vereinbarung findest du
          <a
            href="https://www.facebook.com/legal/controller_addendum"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>
          . Laut dieser Vereinbarung sind wir für die Erteilung der
          Datenschutzinformationen beim Einsatz des Facebook-Tools und für die
          datenschutzrechtlich sichere Implementierung des Tools auf unserer
          Website verantwortlich. Für die Datensicherheit der Facebook-Produkte
          ist Facebook verantwortlich. Betroffenenrechte (z. B.
          Auskunftsersuchen) hinsichtlich der bei Facebook verarbeiteten Daten
          kannst du direkt bei Facebook geltend machen. Wenn du die
          Betroffenenrechte bei uns geltend machst, sind wir verpflichtet, diese
          an Facebook weiterzuleiten.
        </p>
        <p className="_text">
          Die Datenübertragung in die USA wird auf die Standardvertragsklauseln
          der EU-Kommission gestützt. Informationen dazu findest du{" "}
          <a
            href="https://www.facebook.com/legal/EU_data_transfer_addendum"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>{" "}
          und{" "}
          <a
            href="https://www.facebook.com/help/566994660333381"
            rel="noreferrer"
            target={"_blank"}
          >
            hier
          </a>
          . Außerdem verfügt das Unternehmen über eine Zertifizierung nach dem
          <a
            href="https://www.dataprivacyframework.gov/s/"
            rel="noreferrer"
            target={"_blank"}
          >
            Data Privacy Framework Program
          </a>
          .
        </p>
        <p className="_text">
          In den{" "}
          <a
            href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0"
            rel="noreferrer"
            target={"_blank"}
          >
            Datenschutzhinweisen
          </a>{" "}
          von Facebook findest du weitere Hinweise zum Schutz deiner
          Privatsphäre. Du kannst außerdem die Remarketing-Funktion „Custom
          Audiences” im Bereich{" "}
          <a
            href="https://accountscenter.facebook.com/ad_preferences"
            rel="noreferrer"
            target={"_blank"}
          >
            Einstellungen für Werbeanzeigen
          </a>{" "}
          D deaktivieren. Dazu musst du bei Facebook angemeldet sein.
        </p>
        <p className="_text">
          Wenn du kein Facebook Konto besitzen, kann die nutzungsbasierte
          Werbung von Facebook auf der Website der
          <a
            href="https://www.youronlinechoices.com/de/praferenzmanagement/"
            rel="noreferrer"
            target={"_blank"}
          >
            European Interactive Digital Advertising
          </a>
          Alliance deaktiviert werden.
        </p>
      </div>
    </main>
  );
}
