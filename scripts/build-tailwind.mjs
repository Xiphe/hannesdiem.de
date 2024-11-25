import { readdirSync, statSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");

// Base directory containing site folders
const baseDir = resolve("app");

// Find all directories in the base directory
const siteDirs = readdirSync(baseDir).filter((file) => {
  return statSync(join(baseDir, file)).isDirectory();
});

// // Start Tailwind watch mode for each site
siteDirs.forEach((site) => {
  const sitePath = join(baseDir, site, "_src/styles");
  const inputCSS = join(sitePath, "styles.css");
  const outputCSS = join(sitePath, "styles.build.css");
  const config = join(sitePath, "tailwind.config.js");

  if (!existsSync(inputCSS) || !existsSync(config)) {
    return;
  }

  const tailwindProcess = spawn(
    "npx",
    ["tailwindcss", "-i", inputCSS, "-o", outputCSS, "--config", config].concat(
      args,
    ),
    { stdio: "inherit" },
  );

  // // Log output from Tailwind process
  // tailwindProcess.stdout.on("data", (data) => {
  //   console.log(`[${site}] ${data.toString()}`);
  // });

  // tailwindProcess.stderr.on("data", (data) => {
  //   console.error(`[${site} ERROR] ${data.toString()}`);
  // });

  tailwindProcess.on("close", (code) => {
    console.log(`[${site}] Tailwind process exited with code ${code}`);
  });
});
