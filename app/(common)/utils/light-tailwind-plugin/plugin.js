const plugin = require("tailwindcss/plugin");
const transformThemeValue =
  require("tailwindcss/lib/util/transformThemeValue").default;
const {
  // @ts-ignore
  formatBoxShadowValue,
  // @ts-ignore
  parseBoxShadowValue,
} = require("tailwindcss/lib/util/parseBoxShadowValue");
const flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default;
const toColorValue = require("tailwindcss/lib/util/toColorValue").default;

const defaultLights = {
  sm: "inset 1px 1px 1px -1px rgb(255 255 255 / 1)",
  DEFAULT: "inset 1px 1px 2px -1px rgb(255 255 255 / 1)",
  md: "inset 1px 1px 2px rgb(255 255 255 / 0.8)",
  lg: "inset 2px 2px 5px rgb(255 255 255 / 0.5)",
  xl: "inset 10px 10px 25px -10px rgb(255 255 255 / 0.5)",
  "2xl": "inset 25px 25px 50px -20px rgb(255 255 255 / 0.5)",
  none: "none",
};

// @ts-ignore
module.exports = plugin(({ matchUtilities, addDefaults, theme }) => {
  const defaultBoxShadow = [
    `var(--tw-ring-offset-shadow, 0 0 #0000)`,
    `var(--tw-ring-shadow, 0 0 #0000)`,
    `var(--tw-light, 0 0 #0000)`,
    `var(--tw-shadow)`,
  ].join(", ");
  const defaultLight = [
    `var(--tw-ring-offset-shadow, 0 0 #0000)`,
    `var(--tw-ring-shadow, 0 0 #0000)`,
    `var(--tw-shadow, 0 0 #0000)`,
    `var(--tw-light)`,
  ].join(", ");

  let transformBoxShadowValue = transformThemeValue("boxShadow");
  let transformValue = transformThemeValue("light");
  addDefaults("box-shadow", {
    "--tw-ring-offset-shadow": "0 0 #0000",
    "--tw-ring-shadow": "0 0 #0000",
    "--tw-shadow": "0 0 #0000",
    "--tw-shadow-colored": "0 0 #0000",
    "--tw-light": "0 0 #0000",
    "--tw-light-colored": "0 0 #0000",
  });

  matchUtilities(
    {
      shadow(value) {
        value = transformBoxShadowValue(value);
        let ast = parseBoxShadowValue(value);
        for (let shadow of ast) {
          if (!shadow.valid) {
            continue;
          }

          if (shadow.x === "0" && shadow.y === "0") {
            continue;
          }

          shadow.x = `calc(${shadow.x === "0" ? shadow.y : shadow.x} * var(--tw-light-dir-x, 0))`;
          shadow.y = `calc(${shadow.y === "0" ? shadow.x : shadow.y} * var(--tw-light-dir-y, 1))`;
        }

        const unColoredShadow = formatBoxShadowValue(ast);

        for (let shadow of ast) {
          // Don't override color if the whole shadow is a variable
          if (!shadow.valid) {
            continue;
          }

          shadow.color = "var(--tw-shadow-color)";
        }

        return {
          "@defaults box-shadow": {},
          "--tw-shadow": value === "none" ? "0 0 #0000" : unColoredShadow,
          "--tw-shadow-colored":
            value === "none" ? "0 0 #0000" : formatBoxShadowValue(ast),
          "box-shadow": defaultBoxShadow,
        };
      },
    },
    { values: theme("boxShadow"), type: "shadow" },
  );

  matchUtilities(
    {
      shadow: (value) => {
        return {
          "--tw-shadow-color": toColorValue(value),
          "--tw-shadow": "var(--tw-shadow-colored)",
        };
      },
    },
    {
      values: flattenColorPalette(theme("boxShadowColor")),
      type: ["color", "any"],
    },
  );

  matchUtilities(
    {
      light(value) {
        value = transformValue(value);
        let ast = parseBoxShadowValue(value);
        for (let light of ast) {
          if (!light.valid) {
            continue;
          }

          light.x = `calc(${light.x} * var(--tw-light-dir-x, 0))`;
          light.y = `calc(${light.y} * var(--tw-light-dir-y, 1))`;
        }

        const unColoredLight = formatBoxShadowValue(ast);

        for (let light of ast) {
          if (!light.valid) {
            continue;
          }

          light.color = `var(--tw-light-color)`;
        }

        return {
          "@defaults light": {},
          "--tw-light": value === "none" ? "0 0 #0000" : unColoredLight,
          "--tw-light-colored":
            value === "none" ? "0 0 #0000" : formatBoxShadowValue(ast),
          "box-shadow": defaultLight,
        };
      },
    },
    {
      values: theme("light", defaultLights),
      type: "shadow",
    },
  );

  matchUtilities(
    {
      light: (value) => {
        return {
          "--tw-light-color": toColorValue(value),
          "--tw-light": "var(--tw-light-colored)",
        };
      },
    },
    {
      values: flattenColorPalette(theme("boxShadowColor")),
      type: ["color", "any"],
    },
  );

  matchUtilities(
    {
      light: (value) => {
        return {
          "--tw-light-dir-x": String(value[0]),
          "--tw-light-dir-y": String(value[1]),
        };
      },
    },
    {
      values: {
        top: [0, 1],
        "top-right": [-1, 1],
        right: [-1, 0],
        "bottom-right": [-1, -1],
        bottom: [0, -1],
        "bottom-left": [1, -1],
        left: [1, 0],
        "top-left": [1, 1],
        front: [0, 0],
      },
      type: ["length"],
    },
  );
});
