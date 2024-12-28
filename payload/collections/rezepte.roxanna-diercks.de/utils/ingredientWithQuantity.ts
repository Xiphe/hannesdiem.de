import { RecipeIngredient, RecipeQuantityType } from "@/payload-types";

export function ingredientWithQuantity(
  quantity: number = 1,
  quantityType: RecipeQuantityType | null,
  ingredient: RecipeIngredient,
) {
  const quantityLabel = !quantityType
    ? ""
    : quantity > 1
      ? quantityType.plural
      : quantity < 1
        ? quantityType.fraction
        : quantityType.singular;

  const ingredientLabel =
    quantity > 1 && !quantityType?.plural ? ingredient.plural : ingredient.name;

  return [quantity, quantityLabel, ingredientLabel]
    .filter((f) => f != null)
    .join(" ");
}
