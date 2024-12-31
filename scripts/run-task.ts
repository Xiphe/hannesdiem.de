import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

await payload.jobs.queue({
  workflow: "rcps-import-recipe",
  input: { croutonRecipeId: 1 },
});

await payload.jobs.run();
