export type RGBColor = [r: number, g: number, b: number];

export default function rgbToHex(...color: RGBColor) {
  return `#${color
    .map((v) => Math.round(v).toString(16).padStart(2, '0'))
    .join('')}`;
}
