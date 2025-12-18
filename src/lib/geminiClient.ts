import { GoogleGenAI } from "@google/genai";
import config from "../config";

const ai = new GoogleGenAI({
  apiKey: config.geminiConfig.apiKey!,
});

export default ai;
