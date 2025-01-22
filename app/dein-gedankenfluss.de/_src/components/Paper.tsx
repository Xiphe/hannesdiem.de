"use client";

import {
  Strength,
  useRelativeLightDirection,
} from "@utils/light-tailwind-plugin/ElementDirection";
import { ServerPaper, ServerPaperProps } from "./ServerPaper";

export interface PaperProps extends ServerPaperProps {
  lightStrength?: Strength | number;
}

export function Paper({
  lightStrength,
  style,
  ...props
}: Omit<PaperProps, "ref">) {
  const { ref, style: lightStyle } =
    useRelativeLightDirection<HTMLDivElement>(lightStrength);
  return (
    <ServerPaper ref={ref} style={{ ...style, ...lightStyle }} {...props} />
  );
}
