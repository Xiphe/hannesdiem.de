import Footer from "@/components/Footer";
import { proseStyles } from "@/utils";
import clsx from "clsx";

export default function Imprint() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className={clsx("mx-auto px-6 mt-12", proseStyles)}>
        <h1>Imprint</h1>
        <h3>Information according to § 5 TMG:</h3>
        <p>
          Hannes Diercks
          <br />
          Rotdornallee 16
          <br />
          22175 Hamburg
          <br />
        </p>
        <h3>Contact:</h3>
        <p>
          Phone: +49 (0) 151 405 111 98
          <br />
          Email: impressum@xiphe.net
        </p>
      </main>
      <Footer />
    </div>
  );
}
