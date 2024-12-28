import { Recipes } from "./Recipe";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeQuantityType } from "./RecipeQuantityType";
import { RecipeSources } from "./RecipeSource";

export const RezepteRoxannaDiercksDeCollections = [
  Recipes,
  RecipeSources,
  RecipeQuantityType,
  RecipeIngredient,
].map((config) => ({
  ...config,
  admin: { group: "rezepte.roxanna-diercks.de", ...config.admin },
}));
