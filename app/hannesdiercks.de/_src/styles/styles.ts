import clsx from "clsx";

export const focusStyles =
  "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-teal-900 dark:focus-visible:outline-fuchsia-100";

export const linkStyles =
  "underline text-blue-500 visited:text-purple-600 hover:text-gray-950 dark:hover:text-white";

export const buttonDisabledStyles =
  "disabled:text-stone-300 disabled:from-stone-500/60 disabled:to-stone-500/60 hover:disabled:from-stone-500/60 hover:disabled:to-stone-500/60";

export const buttonBaseStyles =
  "rounded-md backdrop-blur shadow px-3.5 py-2.5 text-sm font-semibold";

export const primaryButtonLightStyles =
  "text-white bg-gradient-to-br from-teal-700/80 to-teal-800/80 hover:from-teal-700 hover:to-teal-900";

export const primaryButtonDarkStyles =
  "dark:from-fuchsia-500/60 dark:to-fuchsia-900/80 dark:hover:from-fuchsia-600 dark:hover:to-fuchsia-800";

export const primaryButtonStyles = clsx(
  buttonBaseStyles,
  buttonDisabledStyles,
  primaryButtonLightStyles,
  primaryButtonDarkStyles,
  focusStyles,
);
