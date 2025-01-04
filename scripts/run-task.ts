import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

const { docs } = await payload.find({ collection: "payload-jobs" });

if (!docs.length) {
  await payload.jobs.queue({
    workflow: "rcps-import-recipe",
    input: { croutonRecipeId: 1 },
  });
}

await payload.jobs.run();
