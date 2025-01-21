import { useEffect, useState } from "react";

export type ScreenSize = "sm" | "md" | "lg" | "xl" | "2xl" | number;

const screenSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useIsScreenSize(size: ScreenSize) {
  const [matches, setMatches] = useState(false);
  const targetSize = typeof size === "string" ? screenSizes[size] : size;

  useEffect(() => {
    const checkScreenSize = () => {
      setMatches(window.innerWidth > targetSize);
    };

    checkScreenSize();

    const controller = new AbortController();
    window.addEventListener("resize", checkScreenSize, {
      signal: controller.signal,
    });

    return controller.abort;
  }, [targetSize]);

  return matches;
}
