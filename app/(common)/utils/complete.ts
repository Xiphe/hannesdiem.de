import { ZodString, ZodType } from "zod";
import { completion, RequestOptions } from "zod-gpt";
import { openai } from "./openai";
import { CompletionApi } from "llm-api";

export function complete<T extends ZodType = ZodString>(
  prompt: string | (() => string),
  opt?: Partial<RequestOptions<T>>,
  model: CompletionApi = openai,
) {
  return completion(model, prompt, opt);
}
