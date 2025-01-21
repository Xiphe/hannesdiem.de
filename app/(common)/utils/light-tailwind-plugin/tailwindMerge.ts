const sizes = ["sm", "md", "lg", "xl", "2xl", "none"];
const directions = [
  "top",
  "top-right",
  "right",
  "bottom-right",
  "bottom",
  "bottom-left",
  "left",
  "top-left",
  "front",
];

const lightSizes = sizes.map((s) => `light-${s}`);
function isLightSize(x: unknown) {
  return x === "light" || lightSizes.includes(x as string);
}

const lightDirections = directions.map((s) => `light-${s}`);
function isLightDirection(x: unknown) {
  return lightDirections.includes(x as string);
}

export const lightClassGroups = {
  light: [isLightSize],
  "light-direction": [isLightDirection],
  "light-color": [
    (v: unknown) =>
      typeof v === "string" &&
      v.startsWith("light-") &&
      !isLightSize(v) &&
      !isLightDirection(v),
  ],
};

export type LightClasses = keyof typeof lightClassGroups;
