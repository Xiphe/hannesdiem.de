"use client";

import { usePayloadAPI, useRowLabel } from "@payloadcms/ui";
import { ingredientWithQuantity } from "../utils/ingredientWithQuantity";

export default function TitleRowLabel() {
  const { data } = useRowLabel<{
    quantity?: number;
    "quantity-type": unknown;
    ingredient: unknown;
  }>();

  const [{ data: ingredient }] = usePayloadAPI(
    data?.ingredient ? `/api/rcps-ingredients/${data.ingredient}` : "",
  );

  const [{ data: quantityType }] = usePayloadAPI(
    data?.["quantity-type"]
      ? `/api/rcps-quantity-types/${data?.["quantity-type"]}`
      : "",
  );

  return <>{ingredientWithQuantity(data.quantity, quantityType, ingredient)}</>;
}
