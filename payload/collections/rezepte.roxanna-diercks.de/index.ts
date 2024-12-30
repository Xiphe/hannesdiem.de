import { toTenant } from "@payload/utils/toTenant";
import { Recipes } from "./Recipes";
import { RecipeIngredient } from "./Ingredients";
import { RecipeQuantityType } from "./QuantityTypes";
import { RecipeSources } from "./Sources";
import { Images } from "./Images";

export const RezepteRoxannaDiercksDeCollections = [
  Recipes,
  Images,
  RecipeSources,
  RecipeQuantityType,
  RecipeIngredient,
].map(toTenant("rezepte.roxanna-diercks.de", "rcps"));
