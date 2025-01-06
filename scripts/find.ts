import { getPayload } from "payload";
import config from "@payload-config";
import { mergeQuantityTypes } from "@payload/tenants/rezepte.roxanna-diercks.de/utils/mergeQuantityTypes";

const payload = await getPayload({ config });

// cons

console.log(await mergeQuantityTypes(payload, 25, 22));
