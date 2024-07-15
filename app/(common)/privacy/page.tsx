import Footer from "@/components/Footer";
import { focusStyles, proseStyles } from "@/utils";
import clsx from "clsx";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className={clsx("mx-auto px-6 mt-12", proseStyles)}>
        <h1>Privacy policy</h1>
        <h3>Data Protection Officer 👮</h3>
        <p>
          Hannes Diercks
          <br />
          Rotdornallee 16
          <br />
          22175 Hamburg
          <br />
        </p>
        <h3>Data economy</h3>
        <p>
          <span className="block pl-8 md:pl-12 opacity-60">
            <em>
              A normal privacy policy always starts with{" "}
              <strong>&quot;Your data is very important to us&quot;</strong>
              <br />
              ... I always find that blasphemous
            </em>{" "}
            🤣
          </span>
          <br />
          The <strong>security and privacy of your</strong> data is extremely
          important to me!
          <br />
          Preferably, I don&apos;t want to have any data from you at all.
          <br />
          <br />
          That&apos;s why I do not store, process or collect any personal data.
          <br />
          <br />
          For some functions I use cookies. But never to track you.
          <br />
          <br />
          <span className="block pl-8 md:pl-12 opacity-60">
            ℹ️{" "}
            <em>
              Cookies themselves are not evil, unfortunately they are just used
              by many companies nowadays to track users. I do not track you.
              {/* <br />
              <br />
              What I do for example is: When you pre-save a track on Spotify or
              Deezer I will store an encryption code in your browser that
              ensures that I can only use your Spotify login when you are
              interacting with the site – many other pages don&apos;t do this,
              trust me I&apos;m working in this industry. */}
            </em>{" "}
            {/* 😅 */}
          </span>
          <br />
          Since I don&apos;t have the capacity to run my own data center, this
          site is hosted with{" "}
          <Link
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(focusStyles, "rounded underline")}
          >
            vercel
          </Link>
          . Here you can find their{" "}
          <Link
            href="https://vercel.com/legal/dpa"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(focusStyles, "rounded underline")}
          >
            Data Processing Addendum
          </Link>
          .
          <br />
          <br />
          <span className="block pl-8 md:pl-12 opacity-60">
            ℹ️{" "}
            <em>
              TL;DR: Vercel takes data protection seriously, undergoing annual
              security audits and complying with various international laws.
              They process your personal data like IP addresses and email only
              for the purpose of providing their services and do not sell or
              share your data with third parties. Your data is stored securely
              using strong encryption and reputable cloud services. You have
              control over your data, including the right to delete it. Data
              transfers are done in accordance with international and local
              laws, depending on your jurisdiction, and you&apos;re covered by
              protections like GDPR, CCPA, and more. Legal disputes are settled
              under Irish law. Overall, Vercel aims to keep your data safe and
              secure.
              <br />
            </em>
            <small className="opacity-50">
              yada yada yada (ノ°Д°）ノ︵ ┻━┻
              <br />
              (I&apos;ve feed the 57k characters of the DPA into ChatGPT to get
              this summary)
            </small>
          </span>
        </p>
      </main>
      <Footer />
    </div>
  );
}
