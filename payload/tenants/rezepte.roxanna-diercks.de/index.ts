import { tenant } from "@payload/utils/tenant";
import { Recipes } from "./collections/Recipes";
import { RecipeIngredient } from "./collections/Ingredients";
import { RecipeQuantityType } from "./collections/QuantityTypes";
import { RecipeSources } from "./collections/Sources";
import { Images } from "./collections/Images";
import { DE, EN, ES } from "@payload/utils/locales";

export const RezepteRoxannaDiercksDeConfig = tenant({
  name: "rezepte.roxanna-diercks.de",
  prefix: "rcps",
  providers: [
    "@payload/tenants/rezepte.roxanna-diercks.de/components/IngredientStateProvider.tsx",
  ],
  locales: [EN, ES, DE],
  collections: [
    Recipes,
    Images,
    RecipeSources,
    RecipeQuantityType,
    RecipeIngredient,
  ],
});
