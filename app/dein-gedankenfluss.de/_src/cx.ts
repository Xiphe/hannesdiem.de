import {
  LightClasses,
  lightClassGroups,
} from "@utils/light-tailwind-plugin/tailwindMerge";
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<LightClasses>({
  extend: {
    classGroups: {
      ...lightClassGroups,
      aspect: [
        (x: unknown) => {
          return typeof x === "string" && x.startsWith("aspect-");
        },
      ],
      rounded: [
        (x: unknown) => {
          return typeof x === "string" && x.startsWith("rounded-");
        },
      ],
    },
  },
});

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
