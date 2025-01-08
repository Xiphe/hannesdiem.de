import { PropsWithChildren } from "react";

export default function ErrorLayout({ children }: PropsWithChildren) {
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
