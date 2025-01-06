import { complete } from "@payload/utils/complete";
import { BasePayload } from "payload";
import z from "zod";
import { Language, LANGUAGES, LanguageSchema } from "../../utils/i18n";

const TimingSchema = z.object({
  type: z.literal("timing"),
  time: z.number().describe("the referenced time converted to minutes"),
  children: z
    .string()
    .describe(
      "minimal linkable text for this reference. No additional instructions, article or other references",
    ),
});

const IngredientSchema = z.object({
  type: z.literal("ingredient"),
  ingredient: z
    .string()
    .describe(
      "Name of the ingredient in english as provided by the known ingredients list",
    ),
  quantity: z
    .number()
    .optional()
    .describe("when present, the unit of the ingredient"),
  quantityType: z
    .string()
    .optional()
    .describe(
      "when present, the english abbreviation of unit/quantity type used",
    ),
  children: z
    .string()
    .describe(
      "minimal linkable text for this reference. No additional instructions, article or other references",
    ),
});

const TextSchema = z.object({
  type: z.literal("text"),
  children: z.string(),
});

const ParsedStepSchema = z.object({
  references: z.array(z.union([TimingSchema, IngredientSchema])),
  language: LanguageSchema.describe("The detected language of the given step"),
});

export type Timer = z.TypeOf<typeof TimingSchema>;
export type Ingredient = z.TypeOf<typeof IngredientSchema>;
export type Text = z.TypeOf<typeof TextSchema>;
export type Segment = Timer | Ingredient | Text;

export async function stepToSegments(
  step: string,
  knownIngredients: string[],
  payload: BasePayload,
) {
  const translatedSegments: Partial<Record<Language, Segment[]>> = {};

  payload.logger.info(`Segmenting step "${step}"`);
  const original = await toSegments(step, knownIngredients);
  payload.logger.debug(original);

  translatedSegments[original.language] = original.segments;

  const translations = new Set(LANGUAGES);
  translations.delete(original.language);

  await Promise.all(
    Array.from(translations).map(async (lang) => {
      const language =
        lang === "de" ? "german" : lang === "en" ? "english" : "spanish";

      payload.logger.info(`Translating to ${language}`);
      const res = await complete(
        `Please translate this step of a cooking recipe into ${language}:
\`\`\`
${step}
\`\`\`
`,
        {
          schema: z.object({
            translation: z.string().describe(`${language} translation`),
          }),
        },
      );

      payload.logger.info(`Segmenting "${res.data.translation}"`);
      const translated = await toSegments(
        res.data.translation,
        knownIngredients,
      );
      payload.logger.debug(translated);

      translatedSegments[lang] = translated.segments;
    }),
  );

  return translatedSegments as Required<typeof translatedSegments>;
}

async function toSegments(step: string, knownIngredients: string[]) {
  const { data } = await complete(
    `In the context of a cooking recipe, I need you to identify the language of
a preparation step, as well as references to ingredients and timings so I can
later replace them with links.

The references must be minimal and atomic. No additional instructions, article
or other references must be part of the children.

ExampleInput: \`Next we stir four tablespoons Soy-sauce for 90 seconds.\`
ExampleOutput:
\`\`\`
{
  references: [
    { type: "ingredient", ingredient: "Soy-sauce", quantity: 4, quantityType: "tbsp", children: "four tablespoons Soy-sauce" },
    { type: "timing", time: 1.5, children: "90 seconds" }
  ],
  language: "en",
}
\`\`\`

Step to parse:
---
${step}
---

Known ingredients: [${knownIngredients.join(",")}]`,
    {
      schema: ParsedStepSchema,
    },
  );

  const validReferences = data.references.filter((ref) => {
    if (ref.type === "timing") {
      return true;
    }

    return knownIngredients.includes(ref.ingredient);
  });

  return {
    segments: splitTextWithLinks(step, validReferences),
    language: data.language,
  };
}

export function splitTextWithLinks(
  text: string,
  links: (Timer | Ingredient)[],
): Segment[] {
  const segments: Segment[] = [];
  let currentIndex = 0;

  // Sort links by their position in the text to ensure we handle them sequentially

  console.log(links);
  const sortedLinks = links
    .map((link) => ({ ...link, index: text.indexOf(link.children) }))
    .filter((link) => link.index !== -1) // Ensure valid matches only
    .sort((a, b) => a.index - b.index)
    .filter(({ index, children }) => {
      // Make sure that links don't overlap
      const valid = index >= currentIndex;
      currentIndex += children.length;
      return valid;
    });

  currentIndex = 0;
  for (const link of sortedLinks) {
    const start = link.index;
    const end = start + link.children.length;

    // Add text segment before the current link
    if (currentIndex < start) {
      segments.push({
        type: "text",
        children: text.slice(currentIndex, start),
      });
    }

    // Add the link itself
    segments.push(link);

    // Update the current index
    currentIndex = end;
  }

  // Add remaining text segment after the last link
  if (currentIndex < text.length) {
    segments.push({ type: "text", children: text.slice(currentIndex) });
  }

  return segments;
}
