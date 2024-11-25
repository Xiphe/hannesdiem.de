"use client";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <>
      <h1>Something went wrong!</h1>
      <p>{error?.message || "An unexpected error occurred."}</p>
      <a
        href="#"
        onClick={(ev) => {
          ev.preventDefault();
          reset();
        }}
      >
        Try Again
      </a>{" "}
      &bull; <a href="https://hannesdiem.de">Go back to the homepage</a>
    </>
  );
}
