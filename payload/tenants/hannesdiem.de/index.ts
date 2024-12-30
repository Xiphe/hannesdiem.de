import { Persons } from "./collections/Persons";
import { CoverArts } from "./collections/CoverArts";
import { Releases } from "./collections/Releases";
import { ContributionRoles } from "./collections/ContributionRoles";
import { Genres } from "./collections/Genres";
import { Songs } from "./collections/Songs";
import { tenant } from "@payload/utils/tenant";
import { devSeed } from "./seed";

export const HannesDiemDeConfig = tenant({
  name: "hannesdiem.de",
  prefix: "hdm",
  collections: [Persons, CoverArts, Releases, ContributionRoles, Genres, Songs],
  devSeed,
});
