import { BasePayload, Where, WhereField } from "payload";

export async function mergeQuantityTypes(
  payload: BasePayload,
  targetId: number,
  removeId: number,
) {
  for (const locale of ["en" as const]) {
    const typeToRemove = await payload.findByID({
      collection: "rcps-quantity-types",
      locale,
      id: removeId,
    });

    const typeToMerge = await payload.findByID({
      collection: "rcps-quantity-types",
      locale,
      id: targetId,
    });

    if (!typeToRemove || !typeToMerge) {
      continue;
    }

    const { docs } = await payload.find({
      collection: "rcps-recipes",
      limit: 10000,
      locale,
      where: {
        or: [
          ...queryRichTextDeep({
            richTextField: "step-sections.section-steps.step",
            where: {
              'fields."quantity-type"': {
                equals: removeId,
              },
            },
          }),
          {
            "ingredient-sections.section-ingredients.quantity-type": {
              equals: removeId,
            },
          },
        ],
      },
    });

    await Promise.all(
      docs.map((doc) => {
        let updateIngredientSections = false;
        let updateStepSections = false;

        doc["ingredient-sections"]?.forEach(
          ({ "section-ingredients": ingredients }) => {
            ingredients?.forEach((ingredient) => {
              const quantityType = ingredient["quantity-type"];

              if (typeof ingredient.ingredient !== "number") {
                ingredient.ingredient = ingredient.ingredient.id;
              }

              if (
                (typeof quantityType === "number" &&
                  quantityType === removeId) ||
                (typeof quantityType !== "number" &&
                  quantityType &&
                  quantityType.id === removeId)
              ) {
                updateIngredientSections = true;
                ingredient["quantity-type"] = targetId;
              }
            });
          },
        );

        doc["step-sections"]?.forEach(({ "section-steps": sectionSteps }) => {
          sectionSteps?.forEach(({ step }) => {
            if (step) {
              visitAllNodes(step.root, (node: any) => {
                if (
                  node.type === "inlineBlock" &&
                  node.fields.blockType === "rcps-ingredient-link"
                ) {
                  node.fields.ingredient = node.fields.ingredient.id;

                  if (node.fields["quantity-type"]) {
                    if (node.fields["quantity-type"].id === removeId) {
                      updateStepSections = true;
                      node.fields["quantity-type"].id = targetId;
                    }

                    node.fields["quantity-type"] =
                      node.fields["quantity-type"].id;
                  }
                }
              });
            }
          });
        });

        if (updateIngredientSections || updateStepSections) {
          return payload.update({
            collection: "rcps-recipes",
            locale,
            id: doc.id,
            data: {
              ...(updateIngredientSections
                ? {
                    "ingredient-sections": doc["ingredient-sections"],
                  }
                : {}),
              ...(updateStepSections
                ? {
                    "step-sections": doc["step-sections"],
                  }
                : {}),
            },
          });
        }
      }),
    );

    await payload.update({
      collection: "rcps-quantity-types",
      id: targetId,
      data: {
        aliases: Array.from(
          new Set([
            ...(typeToMerge.aliases || []),
            ...(typeToRemove.aliases || []),
          ]),
        ),
      },
    });

    await payload.delete({
      collection: "rcps-quantity-types",
      id: removeId,
    });
  }
}

function visitAllNodes<Node extends { type: string; children: unknown[] }>(
  node: Node,
  callback: (node: Node) => void,
) {
  callback(node);

  node.children?.forEach((child) => visitAllNodes(child as Node, callback));
}

type QueryRichTextDeepOpts = {
  levels?: number;
  richTextField: string;
  where: Record<string, WhereField>;
};
function queryRichTextDeep({
  richTextField: location,
  where,
  levels = 5,
}: QueryRichTextDeepOpts): Where[] {
  return Array.from({ length: levels }).map((_, i) =>
    Object.fromEntries(
      Object.entries(where).map(([key, whereField]) => [
        `${location}.root.${Array.from({ length: i + 1 })
          .fill("children")
          .join(".")}.${key}`,
        whereField,
      ]),
    ),
  );
}
