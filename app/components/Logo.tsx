import type { ComponentPropsWithoutRef } from 'react';

type ColorSchema = [
  topLeft: string,
  topRight: string,
  bottomRight: string,
  bottomLeft: string,
];

export const SCHEMA_RETRO: ColorSchema = [
  '#86969C',
  '#576C76',
  '#1D3945',
  '#576C76',
];
export const SCHEMA_DARKBLUE_PURPLE: ColorSchema = [
  '#271F96',
  '#780994',
  '#8a18a7',
  '#181179',
];

export default function Logo({
  schema = SCHEMA_DARKBLUE_PURPLE,
  ...props
}: Omit<ComponentPropsWithoutRef<'svg'>, 'version' | 'viewBox' | 'xmlns'> & {
  schema?: ColorSchema;
}) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 149.3 333.3"
      {...props}
    >
      <g>
        <polygon fill={schema[0]} points="9.9,241.7 70.2,208.5 70.2,19.1" />
        <polygon fill={schema[3]} points="70.2,218.6 9.7,251.9 70.2,326.2" />
        <polygon fill={schema[1]} points="139.4,241.7 79,19.1 79,208.5" />
        <polygon fill={schema[2]} points="139.6,251.9 79,218.6 79.1,326.2" />
      </g>
    </svg>
  );
}
