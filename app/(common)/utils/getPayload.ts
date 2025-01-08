import { getPayload as getRealPayload } from "payload";
import { cached } from "./cachedFn";
import config from "@payload-config";

export const getPayload = cached(() => getRealPayload({ config }));
