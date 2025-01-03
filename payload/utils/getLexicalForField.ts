import type { RichTextField } from "payload";
import { createHeadlessEditor } from "@payloadcms/richtext-lexical/lexical/headless";
import type {
  LexicalRichTextAdapter,
  SanitizedServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import { getEnabledNodes } from "@payloadcms/richtext-lexical";

export function getLexicalForField(field: RichTextField) {
  const lexicalAdapter: LexicalRichTextAdapter =
    field.editor as LexicalRichTextAdapter;

  const sanitizedServerEditorConfig: SanitizedServerEditorConfig =
    lexicalAdapter.editorConfig;

  return createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: sanitizedServerEditorConfig,
    }),
  });
}
