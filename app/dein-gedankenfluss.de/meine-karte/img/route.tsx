import { ImageResponse } from "next/og";
import fs from "fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeLine } from "@gf/components/Card/normalizeLine";
import { categoryMap, isCategoryKey } from "@gf/components/Card";

const {
  INK,
  CARAMEL,
  WATER,
  PAPER,
} = require("../../_src/styles/swatches.cjs");
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "";
  const body = searchParams.get("body") || "";
  const optional = searchParams.get("optional") || "";
  const category = searchParams.get("category") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "650px",
          height: "980px",
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
            top: "25px",
            left: "25px",
            height: "920px",
            width: "590px",
            borderRadius: "8.5% / 5.6%",
            backgroundColor: PAPER.DEFAULT,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "113px",
            left: "25px",
            width: "590px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "licorice",
            textAlign: "center",
            fontSize: "84px",
            color: CARAMEL.DEFAULT,
          }}
        >
          {normalizeLine(title, 15).map((test, i) => (
            <div key={i} style={{ height: "70px" }}>
              {test}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: "310px",
            left: "25px",
            width: "590px",
            display: "flex",
            letterSpacing: "0.5px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "27px",
          }}
        >
          {normalizeLine(body).map((test, i) => (
            <div key={i} style={{ height: "33.55px", color: INK.DEFAULT }}>
              {test}
            </div>
          ))}
          <div style={{ height: "33.55px" }}></div>
          {normalizeLine(optional).map((test, i) => (
            <div key={i} style={{ height: "33.55px", color: WATER.river }}>
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
              top: "23px",
              left: "25px",
              height: "920px",
              width: "590px",
            }}
          >
            <path d={categoryMap[category].deco} />
          </svg>
        ) : null}
        {isCategoryKey(category) ? (
          <div
            style={{
              position: "absolute",
              width: "590px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              letterSpacing: "6.55px",
              top: "874px",
              left: "27px",
              fontSize: "27px",
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
          data: fs.readFileSync(
            resolve(__dirname, "./MontserratAlternates-Regular.ttf"),
          ),
          weight: 400,
          style: "normal",
        },
        {
          name: "licorice",
          data: fs.readFileSync(resolve(__dirname, "./Licorice-Regular.ttf")),
          weight: 400,
          style: "normal",
        },
      ],
      width: 650,
      height: 980,
    },
  );
}
