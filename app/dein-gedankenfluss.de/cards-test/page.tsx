import {
  OceanLine,
  RioJaraLine,
  WaterLine,
  WaveLine,
} from "@gf/components/lines";
import {
  buttonCaramelStyles,
  buttonInkStyles,
  buttonPaperStyles,
  buttonSecondaryStyles,
  focusStyles,
  footerLinkStyles,
  inputLightStyles,
  inputStyles,
} from "@gf/styles/styles";
import { cx } from "@gf/cx";
import Image from "next/image";
import Link from "next/link";
import journalWavesImg from "../_src/img/journal_waves.jpg";
import { Cards } from "@gf/components/Cards";
import { InfoPaper } from "@gf/components/InfoPaper";
import { AmazonIcon } from "@gf/components/icons/AmazonIcon";
import { EtsyIcon } from "@gf/components/icons/EtsyIcon";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { Footer } from "@gf/components/Footer";
import { Header } from "@gf/components/Header";
import { ScrollAnchor } from "@gf/components/ScrollAnchor";
import { Paper } from "@gf/components/Paper";
import { FlyInPaper, FlyInPaperImage } from "@gf/components/FlyInPaper";

export default function Home() {
  return (
    <>
      <div className="relative min-h-[max(100vh,40rem)]">
        <Header>
          <div className="h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-white font-licorice drop-shadow-lg text-7xl md:text-[min(10vw,10rem)] text-center">
                Tritt in
                <br className="sm:hidden" /> den Dialog
                <br className="sm:hidden" /> mit dir.
              </h1>
            </div>
          </div>
        </Header>
        <Image
          src={journalWavesImg}
          alt=""
          priority
          className="absolute inset-0 -z-10 object-cover object-top size-full"
        />
      </div>

      {/* Benefits */}
      <div className="pb-24">
        <div className="container mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4">
            <div className="flex justify-center z-20 -mt-8">
              <a id="karten" className="-translate-y-16" />
              <Cards
                title={["Welche Personen", "unterstützen dich?"]}
                body={[
                  "Schreibe auf, welche Personen",
                  "du besonders wertschätzt, wen",
                  "du um Rat oder Hilfe bittest.",
                  null,
                  "Wie haben sie dich bisher",
                  "konkret unterstützt?",
                  null,
                  "Was schätzt du an ihnen?",
                ]}
                optional={[
                  "Lass eine der Personen wissen,",
                  "wie sehr du sie wertschätzt.",
                ]}
                category="dankbarkeit"
              />
            </div>
          </div>
          <div
            className={cx(
              "col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8",
              "flex flex-col justify-center items-center md:items-start py-8 prose",
              "lg:prose-xl prose-licorice prose-invert",
              "text-center md:text-left px-8 md:px-0 md:pl-4",
            )}
          >
            <h2>Xoxoxoxoxo</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex flex-col items-center md:items-start gap-2 not-prose text-base">
              <Link
                href="example.org"
                className={cx(buttonCaramelStyles, focusStyles)}
              >
                <AmazonIcon /> Jetzt bestellen auf Amazon
              </Link>
              <Link
                href="example.org"
                className={cx(buttonPaperStyles, focusStyles)}
              >
                <EtsyIcon /> Jetzt bestellen auf Etsy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <WaveLine
        className="-rotate-3 scale-105"
        extraViewBoxHeight={30}
        strokeClassName="stroke-graphite-50"
      />

      <a id="fotos" className="block -translate-y-16" />
      <div className="w-full grid grid-cols-12">
        <Image
          src={journalWavesImg}
          alt=""
          className="col-span-6 md:col-span-4"
        />
        <Image
          src={journalWavesImg}
          alt=""
          className="col-span-6 md:col-span-4"
        />
        <Image
          src={journalWavesImg}
          alt=""
          className="col-span-12 md:col-span-4"
        />
      </div>
      <div className="md:h-0 w-full z-10 md:flex md:items-center md:justify-center">
        <InfoPaper className="shadow-lg light-md rounded-none md:rounded-sm">
          <h3>Lorem ipsum dolor sit amet</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </InfoPaper>
      </div>
      <div className="w-full grid grid-cols-12">
        <Image src={journalWavesImg} alt="" className="col-span-6" />
        <Image src={journalWavesImg} alt="" className="col-span-6" />
      </div>
      <OceanLine className="rotate-180" strokeClassName="stroke-graphite-50" />

      {/* Newsletter/Connect */}
      <a id="newsletter" className="block -translate-y-16" />
      <div>
        <div className="container mx-auto my-24 md:my-48 max-w-screen-md flex flex-col items-center">
          <h3 className="text-center text-5xl font-licorice mb-6 md:text-7xl">
            Bleib auf dem Laufenden
          </h3>
          <p className="text-center lg:text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <form className="flex flex-col items-stretch sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Deine E-Mail"
              className={cx(inputLightStyles)}
            />
            <button
              type="submit"
              className={cx(
                buttonPaperStyles,
                focusStyles,
                "text-lg justify-center",
              )}
            >
              <EnvelopeIcon className="fill-current w-5 h-5" /> Abonnieren
            </button>
          </form>
        </div>
      </div>

      <a id="ueber-uns" className="block -translate-y-16" />
      {/* <h2 className="text-center text-6xl lg:text-7xl font-licorice mb-12 md:mb-16 text-caramel dark:text-paper">
        Über uns
      </h2> */}

      <div className="w-full overflow-x-clip">
        <FlyInPaper direction="right" sheet>
          <FlyInPaperImage
            src={journalWavesImg}
            alt="Handgefertigtes Journal"
            position="right"
          />

          <div className="prose prose-licorice md:prose-xl">
            <h3>Handgefertigt mit Liebe zum Detail</h3>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf
            </p>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf, dass
              jedes Detail stimmt und das fertige Produkt unseren hohen
              Qualitätsansprüchen gerecht wird.
            </p>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf, dass
              jedes Detail stimmt und das fertige Produkt unseren hohen
              Qualitätsansprüchen gerecht wird.
            </p>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf, dass
              jedes Detail stimmt und das fertige Produkt unseren hohen
              Qualitätsansprüchen gerecht wird.
            </p>
          </div>
        </FlyInPaper>
        <FlyInPaper sheet>
          <FlyInPaperImage
            src={journalWavesImg}
            alt="Handgefertigtes Journal"
            position="left"
          />

          <div className="prose prose-licorice md:prose-xl">
            <h3>Handgefertigt mit Liebe zum Detail</h3>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf
            </p>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf, dass
              jedes Detail stimmt und das fertige Produkt unseren hohen
              Qualitätsansprüchen gerecht wird.
            </p>
            <h3>Nachhaltig und hochwertig</h3>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf, dass
              jedes Detail stimmt und das fertige Produkt unseren hohen
              Qualitätsansprüchen gerecht wird.
            </p>
          </div>
        </FlyInPaper>
        <FlyInPaper sheet direction="right">
          <FlyInPaperImage
            src={journalWavesImg}
            alt="Handgefertigtes Journal"
            position="left"
          />

          <div className="prose prose-licorice md:prose-xl">
            <h3>Handgefertigt mit Liebe zum Detail</h3>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf
              <br />
              <br />
            </p>
            <p>
              Jedes Journal wird mit größter Sorgfalt von Hand gefertigt und ist
              ein einzigartiges Stück. Wir legen besonderen Wert darauf, dass
              jedes Detail stimmt und das fertige Produkt unseren hohen
              Qualitätsansprüchen gerecht wird.
            </p>
          </div>
        </FlyInPaper>
      </div>

      <RioJaraLine spaced strokeClassName="stroke-graphite-50" />

      <Footer
        extraLinks={[
          {
            title: "Shops",
            links: [
              { href: "https://amazon.de/s?k=gedankenfluss", label: "Amazon" },
              {
                href: "https://www.etsy.com/shop/Gedankenfluss",
                label: "Etsy",
              },
            ],
          },
        ]}
      ></Footer>
    </>
  );
}
