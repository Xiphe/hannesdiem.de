import { ImageResponse } from "next/og";
import { join } from "node:path";
import { normalizeLine } from "@gf/components/Card/normalizeLine";
import { categoryMap, isCategoryKey } from "@gf/components/Card";
import { readFileSync } from "node:fs";

const {
  INK,
  CARAMEL,
  WATER,
  PAPER,
} = require("../../_src/styles/swatches.cjs");

const montserratFont = readFileSync(
  join(
    process.cwd(),
    "public/dein-gedankenfluss.de/font/MontserratAlternates-Regular.ttf",
  ),
);
const licoriceFont = readFileSync(
  join(process.cwd(), "public/dein-gedankenfluss.de/font/Licorice-Regular.ttf"),
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let scale = Number(searchParams.get("scale") || "1");
  if (isNaN(scale) || scale < 0.1 || scale > 2) {
    scale = 1;
  }
  const title = searchParams.get("title") || "";
  const body = searchParams.get("body") || "";
  const optional = searchParams.get("optional") || "";
  const category = searchParams.get("category") || "";

  const titleLines = normalizeLine(title, 15).slice(0, 2);
  if (titleLines.length === 1) {
    titleLines.unshift(null);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: `${650 * scale}px`,
          height: `${980 * scale}px`,
          display: "flex",
          fontFamily: "montserrat",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: WATER["900"],
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `${25 * scale}px`,
            left: `${25 * scale}px`,
            height: `${920 * scale}px`,
            width: `${590 * scale}px`,
            borderRadius: "8.5% / 5.6%",
            backgroundColor: PAPER.DEFAULT,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: `${113 * scale}px`,
            left: `${25 * scale}px`,
            width: `${590 * scale}px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "licorice",
            textAlign: "center",
            fontSize: `${84 * scale}px`,
            color: CARAMEL.DEFAULT,
          }}
        >
          {titleLines.map((test, i) => (
            <div key={i} style={{ height: `${70 * scale}px` }}>
              {test}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: `${310 * scale}px`,
            left: `${25 * scale}px`,
            width: `${590 * scale}px`,
            display: "flex",
            letterSpacing: `${0.5 * scale}px`,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: `${27 * scale}px`,
          }}
        >
          {normalizeLine(body).map((test, i) => (
            <div
              key={i}
              style={{ height: `${33.55 * scale}px`, color: INK.DEFAULT }}
            >
              {test}
            </div>
          ))}
          <div style={{ height: `${33.55 * scale}px` }}></div>
          {normalizeLine(optional).map((test, i) => (
            <div
              key={i}
              style={{ height: `${33.55 * scale}px`, color: WATER.river }}
            >
              {test}
            </div>
          ))}
        </div>
        {isCategoryKey(category) ? (
          <svg
            fill={WATER["150"]}
            viewBox="0 0 835 1302"
            style={{
              position: "absolute",
              top: `${23 * scale}px`,
              left: `${25 * scale}px`,
              height: `${920 * scale}px`,
              width: `${590 * scale}px`,
            }}
          >
            <path d={categoryMap[category].deco} />
          </svg>
        ) : null}
        {isCategoryKey(category) ? (
          <div
            style={{
              position: "absolute",
              width: `${590 * scale}px`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              letterSpacing: `${6.55 * scale}px`,
              top: `${874 * scale}px`,
              left: `${27 * scale}px`,
              fontSize: `${27 * scale}px`,
              color: WATER.river,
            }}
          >
            {categoryMap[category].title}
          </div>
        ) : null}
      </div>
    ),
    {
      fonts: [
        {
          name: "montserrat",
          data: montserratFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "licorice",
          data: licoriceFont,
          weight: 400,
          style: "normal",
        },
      ],
      width: 640 * scale,
      height: 970 * scale,
    },
  );
}
