"use client";

import { ReactElement } from "react";
import {
  BoltIcon,
  ClipboardDocumentCheckIcon,
  MapIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import portrait from "./_src/img/portrait_hannes_diercks.jpg";
import geloet from "./_src/img/geloet.jpeg";
import clsx from "clsx";
import { primaryButtonStyles } from "./_src/styles/styles";
import { motion } from "motion/react";
import Header from "./_src/components/Header";
import Footer from "./_src/components/Footer";

const coreValues: {
  title: string;
  content: ReactElement;
  className?: string;
  Icon: typeof MapIcon;
}[] = [
  {
    title: "Building Trust and Responsibility",
    Icon: ShieldCheckIcon,
    content: (
      <>
        My work is guided by trust, honesty, and responsibility — both within
        teams and in the relationship with the people using our tools and
        products.
      </>
    ),
  },
  {
    title: "Human Connection and Creativity",
    Icon: SparklesIcon,
    content: (
      <>
        I deeply honor the fundamental human needs for creativity and
        connection. This is reflected in every piece of work I do, whether I’m
        building processes, communities, APIs, or user interfaces.
      </>
    ),
  },
  {
    title: "Enabling Excellence",
    Icon: BoltIcon,
    content: (
      <>
        I believe excellence grows from a state of freedom, dedication, and
        self-actualization. Therefore my personal objectives are tearing down
        blockers, providing enablement, and fostering alignment.
      </>
    ),
  },
  {
    title: "Advocating for Quality",
    Icon: ClipboardDocumentCheckIcon,
    content: (
      <>
        You can expect me to always advocate for security, usability, visual
        appeal, and accessibility of the products I work on — as well as the
        developer experience, performance, documentation, and reliability of the
        tools I create.
      </>
    ),
  },

  {
    title: "Balance and Perspective",
    Icon: StarIcon,
    className:
      "bg-gradient-to-br from-gray-50 to-amber-100 dark:from-blue-950 dark:via-gray-800 dark:to-fuchsia-950/50",
    content: (
      <>
        I combine all of this with a bit of playfulness, a modern hippie
        mindset, a sense of depth, the realization that technology often
        distracts us from the beauty of the real world and a dance between
        over-engineering and pragmatism.
      </>
    ),
  },
];

export default function HannesDiercksIndex() {
  return (
    <div className="bg-stone-100 dark:bg-gray-800">
      <Header />

      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden bg-stone-100 dark:bg-gray-900 pb-16 pt-14 sm:pb-20">
          <Image
            alt=""
            src={geloet}
            className="absolute inset-0 -z-10 size-full object-cover grayscale opacity-30 dark:opacity-30 blur-sm"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-300/50 to-amber-500/50 dark:from-pink-600/80 dark:to-cyan-800/80 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl py-32 sm:py-48 xl:py-56">
              {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 dark:text-gray-400 ring-1 ring-black/10 hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/20">
                  One mentoring slot available starting May 2025.{" "}
                  <a
                    href="#"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    Apply <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div> */}
              <div className="text-center">
                <h1 className="text-balance font-serif text-5xl text-gray-900 dark:text-white sm:text-7xl md:text-8xl">
                  <motion.span
                    className="inline-block"
                    initial={{ y: 0 }}
                    animate={{ y: 1 }}
                    transition={{
                      delay: 2.1,
                      duration: 0.05,
                      repeat: 1,
                      repeatType: "reverse",
                    }}
                  >
                    Move Deliberately
                    <motion.span
                      className="inline-block"
                      initial={{ transform: "translateY(-400px)", opacity: 0 }}
                      animate={{ transform: "translateY(0px)", opacity: 1 }}
                      transition={{ type: "spring", delay: 2, duration: 0.2 }}
                    >
                      ,
                    </motion.span>
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    animate={{ x: -1 }}
                    transition={{
                      delay: 3.65,
                      duration: 0.075,
                      repeat: 1,
                      repeatType: "reverse",
                    }}
                  >
                    Fix Things
                    <motion.span
                      className="inline-block"
                      initial={{ transform: "translateX(500px)", opacity: 0 }}
                      animate={{ transform: "translateX(0px)", opacity: 1 }}
                      transition={{ type: "spring", delay: 3.5, duration: 0.3 }}
                    >
                      .
                    </motion.span>
                  </motion.span>
                </h1>
                <p className="mt-8 max-w-2xl mx-auto text-pretty text-lg font-medium text-gray-600 dark:text-gray-400 sm:text-xl/8">
                  turning great ideas into reality - with teams that care - for
                  people we honor
                  {/* crafting reliable systems - with teams that care - for users
                  we honor */}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href={`mailto:colab@hannesdiercks.de?subject=${encodeURIComponent("Collaboration Inquiry")}&body=${encodeURIComponent(`Hi Hannes,

I am interested in discussing how we might work together.
How about [insert date and time] for a quick call?

Best,
[Your Name]`)}`}
                    className={clsx(
                      primaryButtonStyles,
                      "flex items-center gap-2",
                    )}
                  >
                    <CalendarDaysIcon height="1.2em" /> Schedule a Call
                  </a>

                  {/* <a href="#" className="text-sm/6 font-semibold text-white">
                    Learn more <span aria-hidden="true">→</span>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-amber-200/50 to-orange-600/50 dark:from-cyan-600/80 dark:to-pink-800/80 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        {/* Testimonial section */}
        <div className="relative z-10 dark:bg-gray-900 pb-20 sm:pb-24 xl:pb-0 border-t border-white dark:border-gray-600">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-amber-200/30 to-orange-600/40 dark:from-pink-500/40 dark:to-purple-600/30 opacity-25"
              />
            </div>
          </div>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              <div className="relative aspect-square max-w-sm xl:max-w-none h-full md:-mx-8 xl:mx-0 xl:aspect-auto rounded-2xl overflow-hidden">
                <Image
                  alt="Portrait of Hannes"
                  src={portrait}
                  className="absolute inset-0 size-full object-cover shadow-2xl"
                />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <div className="relative isolate pt-6 text-gray-900 dark:text-gray-200">
                <h3 className="font-serif text-3xl/8 sm:text-4xl/9 mb-4">
                  Hi! I&apos;m Hannes
                </h3>

                <div className="text-lg/8 sm:text-xl/9">
                  <p className="mb-4">
                    I thrive somewhere between technical excellence, user
                    centrism and human collaboration.
                  </p>
                  <p className="mb-4">
                    With <strong className="font-black">over 15 years</strong>{" "}
                    of experience in product development, web engineering,
                    open-source collaboration, and team building, I bring a
                    unique ability to move through all layers of a problem.
                  </p>
                  <p className="mb-4">
                    From engineering challenges to cultural shifts, I help your
                    team create lasting impact.
                  </p>
                  {/* <p className="italic opacity-60">
                    I also surf, make music and help people through mental and
                    emotional blockers.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-300 to-amber-50 dark:from-gray-950 dark:to-fuchsia-950/20 dark:text-white pt-12 sm:pt-24 pb-32">
          <div className="mx-6 md:mx-auto md:max-w-3xl xl:max-w-4xl">
            <h2
              className={`font-serif text-4xl/8 sm:text-5xl/9 dark:text-white p-6
              relative z-10 rounded-tl-2xl rounded-br-2xl text-center`}
            >
              What I stand for.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-16">
              {coreValues.map(
                ({ title, Icon, content, className = "" }, i, arr) => (
                  <div
                    key={title}
                    className={
                      "sm:col-span-2 bg-white dark:bg-gray-800 shadow-md rounded-lg p-7 pb-6 relative dark:border dark:border-gray-700 " +
                      className +
                      (arr.length % 2 !== 0 &&
                      i === arr.length - 1 /* is last of uneven */
                        ? " sm:col-start-2"
                        : "")
                    }
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white flex align-center">
                      <Icon aria-hidden className="w-8 mr-2 shrink-0" />
                      <span className="mt-0.5">{title}</span>
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 sm:text-lg">
                      {content}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* <div>
          <h2
            className={`font-serif text-4xl/8 sm:text-5xl/9 dark:text-white p-6
              relative z-10 rounded-tl-2xl rounded-br-2xl text-center`}
          >
            Work & Insights
          </h2>
        </div> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
