"use client";

import {
  motion,
  MotionStyle,
  useScroll,
  useTransform,
  easeInOut,
} from "motion/react";
import { Card, CardProps } from "./Card";
import { useRef } from "react";

interface CardsProps
  extends Pick<CardProps, "category" | "title" | "optional" | "body"> {}

export function Cards({ category, title, body, optional }: CardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 end", "0.5 start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.4, 0.7], ["60%", "0%", "0%"]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 0, 1, 0.9],
    {
      ease: easeInOut,
    },
  );

  return (
    <motion.div
      className="w-2/3  relative aspect-card"
      ref={ref}
      style={{
        y,
        x: useTransform(rotate, [0, 1], [0, 20]),
        opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]),
        rotate: useTransform(rotate, [0, 1], [0, 3]),
      }}
    >
      <Card
        as={motion.div}
        style={
          {
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
    </motion.div>
  );
}
