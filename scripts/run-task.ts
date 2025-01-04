import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

const { docs } = await payload.find({ collection: "payload-jobs" });

// console.log(JSON.stringify(docs));

if (!docs.length) {
  console.log("Creating Task");
  await payload.jobs.queue({
    workflow: "rcps-import-recipe",
    input: { croutonRecipeId: 3 },
  });
}

await payload.jobs.run();
