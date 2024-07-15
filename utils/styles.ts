import clsx from "clsx";

export const baseFocusStyles =
  "focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-4";

export const focusStyles = clsx(
  baseFocusStyles,
  "focus-visible:outline-blue-800 dark:focus-visible:outline-pink-200 "
);

const baseButtonStyles =
  "font-bold text-lg inline-flex items-center justify-center px-6 py-4 rounded-lg no-underline disabled:opacity-50";

const buttonColorStyles = "bg-pink-50 border-2 border-current dark:bg-blue-600";

const buttonHoverStyles = "hover:bg-pink-100 dark:hover:bg-blue-500";

export const buttonStyles = clsx(
  focusStyles,
  baseButtonStyles,
  buttonColorStyles,
  buttonHoverStyles
);

const disabledButtonExtraStyles = "opacity-50";
export const disabledButtonStyles = clsx(
  baseButtonStyles,
  buttonColorStyles,
  disabledButtonExtraStyles
);

const pbDarkStyles =
  "shadow-md border-2 border-current bg-gradient-to-b text-white from-pink-700 to-pink-500 hover:from-pink-600 hover:to-pink-400";

const pbStyles =
  "shadow-md border-2 border-current bg-gradient-to-b text-black dark:text-white from-blue-50 to-blue-200 hover:from-blue-200 hover:to-blue-300  dark:from-pink-700 dark:to-pink-500 dark:hover:from-pink-600 dark:hover:to-pink-400";

export const primaryButtonStyles = clsx(
  focusStyles,
  baseButtonStyles,
  pbStyles
);

export const primaryButtonDarkStyles = clsx(
  focusStyles,
  baseButtonStyles,
  pbDarkStyles
);

export const proseStyles = "prose dark:prose-invert lg:prose-xl";
