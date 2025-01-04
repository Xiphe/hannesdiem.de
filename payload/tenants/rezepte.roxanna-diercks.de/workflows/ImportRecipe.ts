import { Ingredient, Recipe } from "@/payload-types";
import { fetchFile } from "@payload/utils/fetchFile";
import { WorkflowConfig, WorkflowHandler } from "payload";
import { TranslatedTitle } from "../tasks/TranslateSectionTitle";
import {
  RichText,
  segmentsToLexical,
  TranslateStepOutput,
} from "../tasks/TranslateSteps/TranslateStep";
import {
  ExtractedIngredient,
  ExtractedIngredients,
  isIngredientSectionTitle,
} from "../tasks/ExtractIngredients/ExtractIngredients";

type StepsSection = NonNullable<Recipe["step-sections"]>[number];

const RETRIES = 5;

export const ImportRecipe: WorkflowConfig<"rcps-import-recipe"> = {
  slug: "rcps-import-recipe",
  inputSchema: [
    {
      name: "croutonRecipeId",
      type: "number",
      required: true,
    },
  ],
  retries: 2,
  async handler({ req: { payload }, job, tasks }) {
    const recipe = await payload.findByID({
      collection: "rcps-crumbles",
      id: job.input.croutonRecipeId,
    });
    if (!recipe || !recipe.url) {
      throw new Error("Recipe not found");
    }
    const res = await fetchFile(recipe.url);
    const data = await res.json();
    const ingredientsWithSections = (
      await tasks["rcps-extract-ingredients"](
        "rcps-import-recipe-extract-ingredients",
        {
          retries: RETRIES,
          input: { ingredients: data.ingredients, recipeName: data.name },
        },
      )
    ).ingredients as ExtractedIngredients;

    const ingredientIds = ingredientsWithSections
      .filter(
        (i): i is ExtractedIngredient => !("type" in i && i.type === "title"),
      )
      .map((i) => i.ingredient)
      .filter((i): i is number => typeof i === "number");
    const ingredients = await Promise.all(
      ingredientIds.map((id) =>
        payload.findByID({
          collection: "rcps-ingredients",
          id,
        }),
      ),
    );
    const steps = await getSteps(data.steps, tasks, ingredients);
    const translatedName = (
      await tasks["rcps-translate-section-title"](
        `rcps-import-recipe-translate-name`,
        {
          retries: RETRIES,
          input: { title: data.name },
        },
      )
    ).translations as TranslatedTitle;
    let existing = (
      await payload.find({
        collection: "rcps-recipes",
        locale: "en",
        where: {
          uuid: { equals: data.uuid },
        },
      })
    ).docs[0];

    const publish = Boolean(!existing || existing["publish-imports"]);

    for (const lang of ["en" as const, "de" as const, "es" as const]) {
      const ingredientSections: Recipe["ingredient-sections"] = [
        { title: "", "section-ingredients": [] },
      ];
      for (const i of ingredientsWithSections) {
        if (isIngredientSectionTitle(i)) {
          if (
            ingredientSections.length === 1 &&
            ingredientSections[0]["section-ingredients"]?.length === 0
          ) {
            ingredientSections.pop();
          }
          ingredientSections.push({
            title: i[lang],
            "section-ingredients": [],
          });
        } else {
          ingredientSections.at(-1)!["section-ingredients"]!.push(i);
        }
      }
      const recipe = {
        _status: publish ? "published" : "draft",
        "publish-imports": publish,
        uuid: data.uuid,
        name: translatedName[lang],
        cookingDuration: data.cookingDuration,
        duration: data.duration,
        serves: data.serves,
        defaultScale: data.defaultScale,
        neutritionalInfo: data.neutritionalInfo
          ? await segmentsToLexical(
              [{ type: "text", children: data.neutritionalInfo }],
              [],
              payload,
            )
          : undefined,
        notes: data.notes
          ? await segmentsToLexical(
              [{ type: "text", children: data.notes }],
              [],
              payload,
            )
          : undefined,
        source: data.webLink,
        "source-name": data.sourceName,
        "ingredient-sections": ingredientSections,
        "step-sections": steps[lang],
      } satisfies Partial<Recipe>;

      payload.logger.info(`Writing ${lang}`);
      if (lang === "en" && !existing) {
        existing = await payload.create({
          collection: "rcps-recipes",
          locale: lang,
          draft: !publish,
          data: recipe,
        });
      } else {
        await payload.update({
          collection: "rcps-recipes",
          locale: lang,
          id: existing.id,
          data: recipe,
          draft: !publish,
        });
      }
    }
    payload.logger.info(
      `Successfully imported ${job.input.croutonRecipeId}: ${translatedName.en}`,
    );
  },
};

type RunTaskFunctions = Parameters<
  WorkflowHandler<"rcps-import-recipe">
>[0]["tasks"];

async function getSteps(
  steps: any,
  tasks: RunTaskFunctions,
  ingredients: Ingredient[],
) {
  const sectionsEN: StepsSection[] = [{ title: "", "section-steps": [] }];
  const sectionsDE: StepsSection[] = [{ title: "", "section-steps": [] }];
  const sectionsES: StepsSection[] = [{ title: "", "section-steps": [] }];

  let currentSectionIndex = 0;
  for (const step of steps) {
    if (step.isSection) {
      if (
        sectionsEN.length === 1 &&
        sectionsEN[0]["section-steps"]?.length === 0
      ) {
        sectionsEN.pop();
        sectionsDE.pop();
        sectionsES.pop();
      } else {
        currentSectionIndex++;
      }

      const translations = (
        await tasks["rcps-translate-section-title"](
          `rcps-import-recipe-translate-title-${step.uuid}`,
          {
            retries: RETRIES,
            input: { title: step.step },
          },
        )
      ).translations as TranslatedTitle;

      sectionsEN.push({ title: translations.en, "section-steps": [] });
      sectionsDE.push({ title: translations.de, "section-steps": [] });
      sectionsES.push({ title: translations.es, "section-steps": [] });

      continue;
    }

    const stepRichText = (
      (await tasks["rcps-translate-step"](
        `rcps-import-recipe-to--${step.uuid}`,
        {
          retries: RETRIES,
          input: { step: step.step, ingredients },
        },
      )) as TranslateStepOutput
    ).translations;

    sectionsDE[currentSectionIndex]["section-steps"]?.push({
      step: stepRichText.de,
    });
    sectionsEN[currentSectionIndex]["section-steps"]?.push({
      step: stepRichText.en,
    });
    sectionsES[currentSectionIndex]["section-steps"]?.push({
      step: stepRichText.es,
    });
  }

  return {
    de: sectionsDE,
    en: sectionsEN,
    es: sectionsES,
  };
}
