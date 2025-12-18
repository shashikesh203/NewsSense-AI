import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import config from "../config";

export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: config.geminiConfig.apiKey!,
  model: "text-embedding-004",
});
