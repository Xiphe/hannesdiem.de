import Footer from "@hdx/components/Footer";
import Header from "@hdx/components/Header";
import { focusStyles, linkStyles } from "@hdx/styles/styles";
import clsx from "clsx";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex-grow max-w-7xl mx-auto p-6 lg:px-8 flex flex-col justify-center">
        <h1 className="text-4xl font-serif mb-6">404 - Page Not Found</h1>

        <p>
          <span className="opacity-50">
            Sorry, this page doesn&apos;t exist...
          </span>
          <br />
          <a className={clsx(linkStyles, "rounded-sm", focusStyles)} href="/">
            Go back to the homepage
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
}
