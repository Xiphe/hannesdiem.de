export type RGBColor = [r: number, g: number, b: number];

export function rgbToHex(...color: RGBColor) {
  return `#${color
    .map((v) => Math.round(v).toString(16).padStart(2, '0'))
    .join('')}`;
}

export function hexToRgb(color: string): RGBColor {
  const withOutHash = color.replace(/^#/, '');
  const isShort = color.length === 3;
  return [
    parseInt(withOutHash.substring(0, isShort ? 1 : 2), 16),
    parseInt(withOutHash.substring(isShort ? 1 : 2, isShort ? 2 : 4), 16),
    parseInt(withOutHash.substring(isShort ? 2 : 4), 16),
  ];
}

export function isDark(color: string | RGBColor) {
  const [r, g, b] = typeof color === 'string' ? hexToRgb(color) : color;
  return (
    Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)) <= 127.5
  );
}
