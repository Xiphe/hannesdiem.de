import { ComponentPropsWithoutRef } from "react";

export function PandoraLogo(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 104 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M61 2c-.7 0-1.2.5-1.2 1.2v3.7a6.5 6.5 0 1 0 0 10V18h2.4V2H61Zm-5.2 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM30.1 5.9v1a6.5 6.5 0 1 0 0 10V18h2.4V6h-2.4Zm-4 10.1a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM70.4 5.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 2.6a4 4 0 0 1 3.9 3.9 4 4 0 0 1-3.9 3.9 3.9 3.9 0 1 1 0-7.8ZM96.3 7V5.8h2.3V18h-2.3v-1a6.5 6.5 0 1 1 0-10Zm-8 5a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
      <path d="M81.2 6.7c-1.4.8-2.6 2.4-2.6 5.2v6.2h2.6v-6.2c0-4 4.2-3.8 4.2-3.8V5.5c-.2 0-2.4 0-4.2 1.2ZM41 5.5a6.5 6.5 0 0 1 6.5 6.5v6.1h-2.6V12a4 4 0 0 0-4-3.9 4 4 0 0 0-3.8 3.9v6.1h-2.6V12A6.5 6.5 0 0 1 41 5.5Z"></path>
      <path d="M7.4 7c1.1-1 2.5-1.5 4-1.5 3.7 0 6.6 2.9 6.6 6.5a6.5 6.5 0 0 1-10.6 5v3.8c0 .7-.5 1.2-1.2 1.2H5V6h2.4v1Zm0 5a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
    </svg>
  );
}
