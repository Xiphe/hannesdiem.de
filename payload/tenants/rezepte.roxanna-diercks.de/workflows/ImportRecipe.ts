import { Recipe } from "@/payload-types";
import { WorkflowConfig, WorkflowHandler } from "payload";
import { TranslatedTitle } from "../tasks/TranslateSectionTitle";
import {
  RichText,
  segmentsToLexical,
  TranslateStepOutput,
} from "../tasks/TranslateSteps/TranslateStep";
import { ExtractedIngredients } from "../tasks/ExtractIngredients/ExtractIngredients";
import { toSlug } from "@payload/utils/toSlug";
import { LANGUAGES, Translated } from "../utils/i18n";
import { CrumbleStep, getCruble } from "../utils/getCrumble";

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
  async handler({
    req: { payload },
    job: {
      input: { croutonRecipeId },
    },
    tasks,
  }) {
    const crumble = await getCruble(payload, croutonRecipeId);

    const imageIdsP = tasks["rcps-import-recipe-images"](
      "rcps-import-recipe-images",
      {
        retries: RETRIES,
        input: { "recipe-id": croutonRecipeId },
      },
    );

    const ingredientsWithSections = await runExtractIngredientsTask(
      croutonRecipeId,
      tasks,
    );

    const steps = await getSteps(croutonRecipeId, crumble.steps, tasks);

    const translatedName = (
      await tasks["rcps-translate"](`rcps-import-recipe-translate-name`, {
        retries: RETRIES,
        input: { string: crumble.name },
      })
    ).translations as TranslatedTitle;

    let existing = (
      await payload.find({
        collection: "rcps-recipes",
        locale: "en",
        where: {
          uuid: { equals: crumble.uuid },
        },
      })
    ).docs[0];

    const publish = Boolean(!existing || existing["publish-imports"]);

    for (const lang of LANGUAGES) {
      const ingredientSections: Recipe["ingredient-sections"] = [
        { title: "", "section-ingredients": [] },
      ];

      for (const i of ingredientsWithSections) {
        if (i.type === "title") {
          if (
            ingredientSections.length === 1 &&
            ingredientSections[0]["section-ingredients"]?.length === 0
          ) {
            ingredientSections.pop();
          }

          ingredientSections.push({
            title: i.title[lang],
            "section-ingredients": [],
          });
        } else {
          ingredientSections.at(-1)!["section-ingredients"]!.push(i.data[lang]);
        }
      }

      const recipe = {
        _status: publish ? "published" : "draft",
        "publish-imports": publish,
        uuid: crumble.uuid,
        slug: toSlug(translatedName[lang]),
        name: translatedName[lang],
        cookingDuration: crumble.cookingDuration,
        duration: crumble.duration,
        serves: crumble.serves,
        defaultScale: crumble.defaultScale,
        neutritionalInfo: crumble.neutritionalInfo
          ? await segmentsToLexical(
              [{ type: "text", children: crumble.neutritionalInfo }],
              [],
              payload,
            )
          : undefined,
        notes: crumble.notes
          ? await segmentsToLexical(
              [{ type: "text", children: crumble.notes }],
              [],
              payload,
            )
          : undefined,
        source: crumble.webLink,
        "source-name": crumble.sourceName,
        "ingredient-sections": ingredientSections,
        "step-sections": steps[lang],
        images: ((await imageIdsP).ids as any).map((id: number) => ({
          image: id,
        })),
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
      `Successfully imported ${croutonRecipeId}: ${translatedName.en}`,
    );
  },
};

type RunTaskFunctions = Parameters<
  WorkflowHandler<"rcps-import-recipe">
>[0]["tasks"];

async function runExtractIngredientsTask(
  recipeId: number,
  tasks: RunTaskFunctions,
) {
  return (
    await tasks["rcps-extract-ingredients"](
      "rcps-import-recipe-extract-ingredients",
      {
        retries: RETRIES,
        input: { recipeId: recipeId },
      },
    )
  ).ingredients as ExtractedIngredients;
}

async function getSteps(
  recipeId: number,
  steps: CrumbleStep[],
  tasks: RunTaskFunctions,
) {
  const sections: Translated<StepsSection[]> = {
    en: [{ title: "", "section-steps": [] }],
    de: [{ title: "", "section-steps": [] }],
    es: [{ title: "", "section-steps": [] }],
  };

  const processedSteps = await Promise.all(
    steps.map((step) => processStep(recipeId, step, tasks)),
  );

  let currentSectionIndex = 0;

  for (const step of processedSteps) {
    switch (step.type) {
      case "section": {
        if (
          sections.en.length === 1 &&
          sections.en[0]["section-steps"]?.length === 0
        ) {
          LANGUAGES.forEach((l) => {
            sections[l].pop();
          });
        } else {
          currentSectionIndex++;
        }

        LANGUAGES.forEach((l) => {
          sections[l].push(step.sections[l]);
        });

        break;
      }
      case "step": {
        LANGUAGES.forEach((l) => {
          sections[l][currentSectionIndex]["section-steps"]?.push({
            step: step.step[l],
          });
        });
      }
    }
  }

  return sections;
}

async function processStep(
  recipeId: number,
  step: CrumbleStep,
  tasks: RunTaskFunctions,
) {
  if (step.isSection) {
    return processSection(recipeId, step.uuid, tasks);
  } else {
    return processStepRichtext(recipeId, step.uuid, tasks);
  }
}

async function processSection(
  recipeId: number,
  stepId: string,
  tasks: RunTaskFunctions,
): Promise<{ type: "section"; sections: Translated<StepsSection> }> {
  const translations = (
    await tasks["rcps-translate-section-title"](
      `rcps-import-recipe-translate-title-${stepId}`,
      {
        retries: RETRIES,
        input: { recipeId, stepId },
      },
    )
  ).translations as TranslatedTitle;

  return {
    type: "section",
    sections: {
      en: { title: translations.en, "section-steps": [] },
      de: { title: translations.de, "section-steps": [] },
      es: { title: translations.es, "section-steps": [] },
    },
  };
}

async function processStepRichtext(
  recipeId: number,
  stepId: string,
  tasks: RunTaskFunctions,
): Promise<{ type: "step"; step: Translated<RichText> }> {
  const stepRichText = (
    (await tasks["rcps-translate-step"](`rcps-import-recipe-to--${stepId}`, {
      retries: RETRIES,
      input: { stepId, recipeId },
    })) as TranslateStepOutput
  ).translations;

  return { type: "step", step: stepRichText };
}
