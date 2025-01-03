import { getPayload, Destroy } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

const jobs = await payload.find({ collection: "payload-jobs", limit: 200 });

for await (const job of jobs.docs) {
  await payload.delete({
    collection: "payload-jobs",
    where: { id: { equals: job.id } },
  });
}

console.log("All Jobs deleted");
await payload.db.destroy?.();
process.exit(0);
