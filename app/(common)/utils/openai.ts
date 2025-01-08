import assert from "node:assert";
import { OpenAIChatApi } from "llm-api";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
assert(OPENAI_API_KEY, "OPENAI_API_KEY env must be set");

export const openai = new OpenAIChatApi(
  { apiKey: OPENAI_API_KEY },
  { model: "gpt-4o-mini" },
);
