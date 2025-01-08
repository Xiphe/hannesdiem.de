"use client";

import ErrorLayout from "./(common)/components/ErrorLayout";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <ErrorLayout>
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
      &bull; <a href="/">Go back to the homepage</a>
    </ErrorLayout>
  );
}
