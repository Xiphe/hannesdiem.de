"use client";

import { useAllFormFields } from "@payloadcms/ui";
import { reduceFieldsToValues } from "payload/shared";
import { useEffect, useMemo } from "react";
import { useSetIngredientSections } from "./IngredientStateProvider";
import { ArrayField } from "payload";

export default function IngredientSectionLabel({
  field,
}: {
  field: Pick<ArrayField, "label" | "labels">;
}) {
  const [fields] = useAllFormFields();
  const set = useSetIngredientSections();
  useEffect(() => {
    set(reduceFieldsToValues(fields, true)["ingredient-sections"]);
  }, [fields, set]);

  return field?.label || field?.labels?.singular || null;
}
