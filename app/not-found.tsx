import { PropsWithChildren } from "react";

export default function NotFound() {
  return (
    <ErrorLayout>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn’t find the page you’re looking for.</p>
      <a href="https://hannesdiem.de">Go back to the homepage</a>
    </ErrorLayout>
  );
}

export function ErrorLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            fontFamily: "sans-serif",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
