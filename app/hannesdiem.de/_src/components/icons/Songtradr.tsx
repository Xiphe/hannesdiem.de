import { ComponentPropsWithoutRef, forwardRef } from "react";

export const SongtradrIcon = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<"svg">
>((props, ref) => (
  <svg
    viewBox="0 0 66 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M65.5 94.713c0 3.185-2.613 5.778-5.777 5.778H6.298c-3.185 0-5.778-2.614-5.778-5.778V59.07a.68.68 0 0 1 .674-.673h28.928c.755 0 1.367.612 1.367 1.367v28.683c0 .837.694 1.531 1.531 1.531s1.531-.694 1.531-1.531V59.764c0-2.45-1.98-4.43-4.43-4.43H1.175A.68.68 0 0 1 .5 54.66V6.298C.5 3.113 3.113.52 6.277.52h53.425c3.185 0 5.778 2.613 5.778 5.778v35.297a.68.68 0 0 1-.674.673H35.879A1.368 1.368 0 0 1 34.51 40.9V12.218c0-.837-.694-1.531-1.531-1.531s-1.531.694-1.531 1.531V40.9c0 2.45 1.98 4.43 4.43 4.43h28.927a.68.68 0 0 1 .674.674l.02 48.71Z"
      fill="currentColor"
    />
  </svg>
));

SongtradrIcon.displayName = "LogoIcon";
