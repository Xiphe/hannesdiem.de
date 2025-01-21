"use client";

import {
  motion,
  MotionStyle,
  useScroll,
  useTransform,
  easeInOut,
} from "motion/react";
import { Card, CardProps, Text } from "./Card";
import { useRef } from "react";
import { scrollTo } from "./ScrollAnchor";

interface CardsProps extends Pick<CardProps, "category" | "optional" | "body"> {
  title: Text;
}

export function Cards({ category, title, body, optional }: CardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 end", "0.5 start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.4, 0.7], ["-28%", "0%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0, 1], {
    ease: easeInOut,
  });

  return (
    <motion.div
      className="w-2/3 md:w-3/4 relative aspect-card"
      ref={ref}
      style={{
        y,
        x: useTransform(rotate, [0, 1], [0, 20]),
        rotate: useTransform(rotate, [0, 1], [0, 3]),
      }}
    >
      <Card
        as={motion.div}
        style={
          {
            opacity: useTransform(scrollYProgress, [0, 0.4], [0, 1]),
            rotate: useTransform(rotate, [0, 1], [0, -12]),
            left: useTransform(rotate, [0, 1], ["0%", "-16%"]),
          } satisfies MotionStyle as any
        }
        className="absolute w-full shadow-lg"
        lightStrength={{ left: 0, top: 0.5, bottom: 0.5 }}
      />
      <Card
        as={motion.div}
        style={
          {
            opacity: useTransform(scrollYProgress, [0, 0.4], [0, 1]),
            rotate: useTransform(rotate, [0, 1], [0, -6]),
            left: useTransform(rotate, [0, 1], ["0%", "-8%"]),
          } satisfies MotionStyle as any
        }
        className="absolute w-full shadow-lg"
        lightStrength={{ left: 0, top: 0.5, bottom: 0.5 }}
      />
      <Card
        category={category}
        title={title}
        body={body}
        optional={optional}
        className="absolute w-full shadow-lg"
        lightStrength={{ left: 0, top: 0.5, bottom: 0.5 }}
      />
      <Card
        as={motion.div}
        onClick={(ev) => {
          if (scrollYProgress.get() < 0.1) {
            scrollTo("karten", ev);
          }
        }}
        title={["Entdecken...", null]}
        body={
          "Finde heraus wie du mit Gedankenfluss in den Dialog zu dir selbst treten kannst"
        }
        category="vision"
        style={
          {
            rotate: useTransform(scrollYProgress, [0, 0.03, 0.3], [0, 0, -10]),
            x: useTransform(
              scrollYProgress,
              [0, 0.03, 0.3],
              ["0%", "0%", "-100vw"],
            ),
            y: useTransform(
              scrollYProgress,
              [0, 0.03, 0.3],
              ["0%", "0%", "20%"],
            ),
          } satisfies MotionStyle as any
        }
        className="absolute w-full shadow-lg cursor-pointer"
        lightStrength={{ left: 0, top: 0.5, bottom: 0.5 }}
      />
    </motion.div>
  );
}
