import { cx } from "@utils/cx";

export default function Wiederruf() {
  return (
    <div
      className={cx(
        "mx-auto my-16",
        "prose dark:prose-invert",
        "prose-headings:font-licorice prose-headings:font-normal",
        "prose-h1:text-7xl prose-h1:my-8",
        "prose-h2:text-5xl prose-h2:mt-8 prose-h2:mb-4",
      )}
    >
      <h1>Widerrufsbelehrung</h1>

      <h2>Widerrufsrecht</h2>
      <p>
        Du hast das Recht, deinen Kauf bei uns binnen 14 Tagen ohne Angabe von
        Gründen zu widerrufen. Diese Frist beginnt an dem Tag, an dem du oder
        eine von dir benannte Person die Ware in Besitz genommen hat.
      </p>

      <h2>Widerrufserklärung</h2>
      <p>
        Um dein Widerrufsrecht auszuüben, informiere uns bitte per E-Mail an
        support@dein-gedankenfluss.de oder postalisch an [Name eurer GbR /
        Anschrift einfügen], mit einer eindeutigen Erklärung (z.B. ein formloses
        Schreiben). Du kannst dafür auch das Muster-Widerrufsformular nutzen,
        das du unter https://dein-gedankenfluss.de/widerruf findest. Dieses
        Formular ist aber nicht zwingend vorgeschrieben.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn du deinen Kauf widerrufst, erstatten wir dir alle Zahlungen, die
        wir von dir erhalten haben, einschließlich der Lieferkosten (mit
        Ausnahme zusätzlicher Kosten, falls du eine andere Art der Lieferung als
        unsere günstigste Standardlieferung gewählt hast). Die Erstattung
        erfolgt unverzüglich und spätestens binnen 14 Tagen ab dem Tag, an dem
        wir deine Widerrufserklärung erhalten haben. Für diese Rückzahlung
        verwenden wir dasselbe Zahlungsmittel, das du bei der ursprünglichen
        Transaktion eingesetzt hast, es sei denn, wir vereinbaren ausdrücklich
        etwas anderes. Dir werden wegen dieser Rückzahlung keine Entgelte
        berechnet. Wir können die Rückzahlung verweigern, bis wir die Ware
        zurückerhalten haben oder bis du den Nachweis erbracht hast, dass du die
        Ware zurückgesandt hast – je nachdem, welcher Zeitpunkt früher eintritt.
      </p>

      <h2>Rücksendekosten</h2>
      <p>
        Die unmittelbaren Kosten der Rücksendung trägst du, sofern nicht anders
        in der Produktbeschreibung angegeben.
      </p>
    </div>
  );
}
