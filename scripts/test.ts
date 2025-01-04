import { splitTextWithLinks } from "@payload/tenants/rezepte.roxanna-diercks.de/tasks/TranslateSteps/stepToSegments";

const res = splitTextWithLinks("Stick the cloves ...", [
  { type: "ingredient", children: "the cloves", ingredient: "Cloves" },
  { type: "ingredient", children: "cloves", ingredient: "Cloves" },
]);

console.log(res);
