"use client";

import Image, { ImageProps } from "next/image";
import {
  easeOut,
  motion,
  MotionStyle,
  useScroll,
  useTransform,
} from "motion/react";
import { Paper, PaperProps } from "./Paper";
import { cx } from "@gf/cx";
import { useRelativeLightDirection } from "@utils/light-tailwind-plugin/ElementDirection";
import { useEffect, useRef, useState } from "react";
import { useIsScreenSize } from "@utils/isSmallScreen";

interface FlyInPaperProps extends PaperProps {
  direction?: "left" | "right";
  offsetX?: string;
  offsetY?: string;
  finalRotate?: number;
}

export function FlyInPaper({
  className,
  style,
  direction = "left",
  offsetX = "0%",
  offsetY = "0%",
  finalRotate = direction === "left" ? -0.5 : 0.5,
  ...props
}: FlyInPaperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 end", "-0.1 start"],
  });
  const smallScreen = !useIsScreenSize("md");
  const entry = useTransform(
    scrollYProgress,
    [0, smallScreen ? 0.5 : 0.75],
    [0, 1],
    {
      ease: easeOut,
    },
  );

  return (
    <Paper
      ref={ref}
      sheet
      className={cx(className)}
      as={motion.div}
      style={
        {
          rotate: useTransform(
            entry,
            [0, 1],
            smallScreen ? [5, 0] : [direction === "left" ? -5 : 5, finalRotate],
          ),
          y: useTransform(
            entry,
            [0, 1],
            [smallScreen ? "0%" : "-30%", smallScreen ? "0%" : offsetY],
          ),
          x: useTransform(
            entry,
            [0, 1],
            [
              direction === "left" ? "-200%" : "200%",
              smallScreen ? "0%" : offsetX,
            ],
          ),
          ...style,
        } satisfies MotionStyle as any
      }
      {...props}
    />
  );
}

export function FlyInPaperImage({
  className,
  position = "left",
  ...props
}: ImageProps & { position?: "left" | "right" }) {
  return (
    <Image
      {...props}
      {...useRelativeLightDirection(
        position === "left" ? { right: 0 } : { left: 0 },
      )}
      className={cx(
        "mb-8 -rotate-1 w-3/4 mx-auto shadow-md",
        "md:w-1/2 md:mb-4 ",
        position === "left" &&
          "md:mr-2 md:float-left md:-translate-x-16 md:scale-110",
        position === "right" &&
          "md:ml-2 md:float-right md:translate-x-16 md:scale-110",
        className,
      )}
    />
  );
}
