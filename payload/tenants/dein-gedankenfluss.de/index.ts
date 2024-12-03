import { tenant } from "@payload/utils/tenant";
import { Pages } from "./collections/Page";

export const DeinGedankenflussDeConfig = tenant({
  name: "dein-gedankenfluss.de",
  prefix: "gdf",
  collections: [Pages],
});
