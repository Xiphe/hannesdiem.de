"use client";

import { useFormFields, usePayloadAPI } from "@payloadcms/ui";
import { useIngredientSections } from "./IngredientStateProvider";
import { useMemo } from "react";
import { ingredientWithQuantity as renderIngredientWithQuantity } from "../utils/ingredientWithQuantity";

export default function TitleRowLabel(props: unknown) {
  const ingredientID = useFormFields(([fields]) => fields.ingredient?.value);
  const fraction = useFormFields<number>(([fields]) => {
    return fields.fraction?.value as number;
  });
  const ingredientSections = useIngredientSections();

  const ingredientWithQuantity = useMemo(() => {
    for (const section of ingredientSections) {
      for (const ingredient of section["section-ingredients"] || []) {
        if (ingredient.ingredient === ingredientID) {
          return ingredient;
        }
      }
    }
  }, [ingredientSections, ingredientID]);

  const [{ data: ingredientDetails }] = usePayloadAPI(
    ingredientID ? `/api/rcps-ingredients/${ingredientID}` : "",
  );
  const [{ data: quantityType }] = usePayloadAPI(
    ingredientWithQuantity?.["quantity-type"]
      ? `/api/rcps-quantity-types/${ingredientWithQuantity?.["quantity-type"]}`
      : "",
  );

  if (!ingredientWithQuantity) {
    return (
      <span
        style={{ color: "orange" }}
        title="This ingredient is not in the ingredient list"
      >
        ⚠ {renderIngredientWithQuantity(fraction, null, ingredientDetails)}
      </span>
    );
  }

  return (
    <>
      {renderIngredientWithQuantity(
        (ingredientWithQuantity?.quantity || 0) * (fraction || 1),
        quantityType,
        ingredientDetails,
      )}
    </>
  );
}
