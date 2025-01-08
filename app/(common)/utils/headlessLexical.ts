import { createHeadlessEditor } from "@payloadcms/richtext-lexical/lexical/headless";
import {
  getEnabledNodes,
  sanitizeServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import {
  defaultEditorConfig,
  defaultEditorFeatures,
} from "@payloadcms/richtext-lexical";
import payloadConfig from "@payload-config";

export async function getSanitizedEditorConfig() {
  return sanitizeServerEditorConfig(
    {
      ...defaultEditorConfig,
      features: [...defaultEditorFeatures],
    },
    await payloadConfig,
  );
}

export async function getHeadlessEditor() {
  return createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: await getSanitizedEditorConfig(),
    }),
  });
}
