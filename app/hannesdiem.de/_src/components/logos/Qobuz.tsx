import { ComponentPropsWithoutRef } from "react";

export function QobuzLogo(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 104 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M51.5 7.5c1-.6 2-.9 3-.9a5.8 5.8 0 1 1-5.8 5.9V2a1 1 0 1 1 2 0v10.5a3.8 3.8 0 1 0 .8-2.3V7.5Zm19.9.2a1 1 0 0 0-2 0v6.1c0 1.7-1 2.5-2.8 2.5-1.8 0-2.9-.9-2.9-2.5V7.7a1 1 0 0 0-2 0v6.1c0 2.5 2.2 4.6 4.9 4.6s4.8-2 4.8-4.6V7.7Zm8.6 8.7h-4.8L80.7 9a1.5 1.5 0 0 0-1.1-2.4h-6a1 1 0 0 0-1 1 1 1 0 0 0 1 1h4.8L72.9 16a1.5 1.5 0 0 0 1.2 2.3h6c.5 0 .9-.5.9-1 0-.6-.4-1-1-1Z"></path>
      <path d="M41.7 6.7a5.8 5.8 0 1 0 0 11.6 5.8 5.8 0 0 0 0-11.6Zm0 9.6a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Z"></path>
      <path d="M31.9 17.5a5.8 5.8 0 1 1 2.8-5V23a1 1 0 1 1-2 0V12.5a3.8 3.8 0 1 0-.8 2.3v2.7Z"></path>
    </svg>
  );
}
