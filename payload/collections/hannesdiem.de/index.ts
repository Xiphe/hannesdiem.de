import { Persons } from "./Persons";
import { CoverArts } from "./CoverArts";
import { Releases } from "./Releases";
import { ContributionRoles } from "./ContributionRoles";
import { Genres } from "./Genres";
import { Songs } from "./Songs";

export const HannesDiemDeCollections = [
  Persons,
  CoverArts,
  Releases,
  ContributionRoles,
  Genres,
  Songs,
].map((config) => ({
  ...config,
  admin: { group: "hannesdiem.de", ...config.admin },
}));
