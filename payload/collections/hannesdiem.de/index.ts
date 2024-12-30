import { Persons } from "./Persons";
import { CoverArts } from "./CoverArts";
import { Releases } from "./Releases";
import { ContributionRoles } from "./ContributionRoles";
import { Genres } from "./Genres";
import { Songs } from "./Songs";
import { CollectionConfig } from "payload";
import { toTenant } from "@payload/utils/toTenant";

export const HannesDiemDeCollections = [
  Persons,
  CoverArts,
  Releases,
  ContributionRoles,
  Genres,
  Songs,
].map(toTenant("hannesdiem.de", "hdm"));
