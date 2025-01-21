import { cx } from "@gf/cx";

export const focusBaseStyles = cx(
  "focus-visible:outline focus-visible:z-10 focus-visible:outline-4",
  "focus-visible:outline-4 focus-visible:outline-offset-4",
);

export const focusLightStyles = cx(
  focusBaseStyles,
  "focus-visible:outline-caramel",
);

export const focusStyles = cx(
  focusLightStyles,
  "dark:focus-visible:outline-paper",
);

export const linkStyles = "hover:text-caramel dark:hover:text-paper-300";

export const buttonBaseStyles = cx(
  "inline-flex items-center gap-4",
  "rounded-md pl-4 pr-6 py-2",
  "transition-colors",
);

export const buttonCaramelStyles = cx(
  buttonBaseStyles,
  "bg-caramel-300 text-ink",
  "hover:bg-caramel-400",
);

export const buttonSecondaryStyles = cx(
  buttonBaseStyles,
  "bg-ink dark:bg-paper text-paper dark:text-ink",
  "hover:bg-ink-900 dark:hover:bg-paper-200",
);

export const buttonInkStyles = cx(
  buttonBaseStyles,
  "bg-ink text-paper",
  "hover:bg-ink-900",
);

export const buttonPaperStyles = cx(
  buttonBaseStyles,
  "bg-paper text-ink",
  "hover:bg-paper-200",
);

export const buttonOutlineStyles = cx(
  buttonBaseStyles,
  "border-2 border-ink-700 dark:border-paper text-ink dark:text-paper",
  "hover:bg-white/80 dark:hover:bg-black/20",
);

export const inputStyles = cx(
  "border-2 bg-transparent rounded-md text-lg py-1.5 px-4",
  "border-ink-950 dark:border-paper",
  "focus:outline-none focus:ring-2 focus:ring-ink-950 dark:focus:ring-paper",
);

export const footerLinkStyles = cx(
  "hover:text-caramel dark:hover:text-white inline-flex gap-1 items-center rounded-sm",
);
