import { ArrayField, BasePayload, RichTextField, TaskConfig } from "payload";
import { Ingredient, Recipe } from "@/payload-types";
import { getLexicalForField } from "@payload/utils/getLexicalForField";
import { $createServerInlineBlockNode } from "@/node_modules/@payloadcms/richtext-lexical/dist/features/blocks/server/nodes/InlineBlocksNode";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  ParagraphNode,
} from "@payloadcms/richtext-lexical/lexical";
import { Segment, stepToSegments } from "./stepToSegments";
import { ensureQuantityType } from "../ExtractIngredients/ensureQuantityType";
import { ensureIngredient } from "../ExtractIngredients/ensureIngredient";

export type RichText = NonNullable<Recipe["notes"]>;

export type TranslatedSteps = {
  en: RichText;
  de: RichText;
  es: RichText;
};
export type TranslateStepOutput = {
  translations: TranslatedSteps;
};

export const TranslateStep: TaskConfig<"rcps-translate-step"> = {
  slug: "rcps-translate-step",
  inputSchema: [
    {
      name: "step",
      type: "json",
      required: true,
    },
    {
      name: "ingredients",
      type: "json",
      required: true,
    },
  ],
  outputSchema: [
    {
      name: "translations",
      type: "json",
      required: true,
    },
  ],
  async handler({ req: { payload }, input: { step, ingredients } }) {
    try {
      const ingredientNames = (ingredients as Ingredient[]).map(
        ({ singular }) => singular,
      );

      const translatedSegments = await stepToSegments(
        step as string,
        ingredientNames,
        payload,
      );

      return {
        output: {
          translations: {
            de: await segmentsToLexical(
              translatedSegments.de,
              ingredients as any,
              payload,
            ),
            en: await segmentsToLexical(
              translatedSegments.en,
              ingredients as any,
              payload,
            ),
            es: await segmentsToLexical(
              translatedSegments.es,
              ingredients as any,
              payload,
            ),
          },
        } satisfies TranslateStepOutput,
        state: "succeeded",
      };
    } catch (err) {
      payload.logger.error(err);
      return {
        error: err,
        output: {
          translations: null,
        },
        state: "failed",
      };
    }
  },
};

export async function segmentsToLexical(
  segments: Segment[],
  ingredients: Ingredient[],
  payload: BasePayload,
) {
  const editor = getStepEditor(payload);

  await editor.update(() => $getRoot().append($createParagraphNode()));

  for await (const segment of segments) {
    switch (segment.type) {
      case "timing": {
        if (segment.time > 0) {
          await editor.update(() =>
            ($getRoot().getFirstChild() as ParagraphNode).append(
              $createServerInlineBlockNode({
                blockType: "timer",
                time: segment.time,
                "link-text": segment.children,
              } as any),
            ),
          );
        } else {
          await editor.update(() =>
            ($getRoot().getFirstChild() as ParagraphNode).append(
              $createTextNode(segment.children),
            ),
          );
        }
        break;
      }
      case "ingredient": {
        const ingredient =
          ingredients.find(({ singular }) => singular === segment.ingredient)
            ?.id || (await ensureIngredient(payload, segment.ingredient)).id;

        const quantityType = segment.quantityType
          ? await ensureQuantityType(payload, segment.quantityType)
          : undefined;

        await editor.update(() =>
          ($getRoot().getFirstChild() as ParagraphNode).append(
            $createServerInlineBlockNode({
              blockType: "rcps-ingredient-link",
              ingredient,
              quantity: segment.quantity,
              quantityType,
              "link-text": segment.children,
            } as any),
          ),
        );
        break;
      }
      case "text": {
        await editor.update(() =>
          ($getRoot().getFirstChild() as ParagraphNode).append(
            $createTextNode(segment.children),
          ),
        );
      }
    }
  }

  return editor.getEditorState().toJSON() as RichText;
}

function getStepEditor(payload: BasePayload) {
  const stepSections = payload.collections["rcps-recipes"].config.fields.find(
    (field) => "name" in field && field.name === "step-sections",
  ) as ArrayField | undefined;
  const sectionSteps = stepSections?.fields.find(
    (field) => "name" in field && field.name === "section-steps",
  ) as ArrayField | undefined;
  const stepField = sectionSteps?.fields.find(
    (field) => "name" in field && field.name === "step",
  ) as RichTextField | undefined;

  if (!stepField || stepField.type !== "richText") {
    throw new Error("Could not find step rich-text field");
  }

  return getLexicalForField(stepField);
}
