import ai from "../config/gemini";
import { transformQuery } from "./queryTransformer";
import { embedQuery } from "./embeddings";
import { searchVector } from "./vectorSearch";
import { history } from "../utils/history";
import { storeLastFiveQA } from "../utils/helpers/llmCache";

export default async function chat({
  userQuery,
  sessionId,
}: {
  userQuery: string;
  sessionId: string;
}) {
  const rewrittenQuery = await transformQuery({ userQuery, sessionId });
  const vector = await embedQuery(rewrittenQuery);
  const context = await searchVector(vector);

  history.push({
    role: "user",
    parts: [{ text: rewrittenQuery }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      systemInstruction: `
      You have to behave like a News Analysis Expert.
      You will be given a context containing relevant news information.
      Your task is to answer the user's question based ONLY on the provided context.
      If the answer is not present in the context,
      Make it a new question with refreshing sentence without referring to the previous chat,
      "I could not find the answer in the provided document."
      Keep your answers clear, factual, concise, and written in a professional news-reporting tone.
      
      Context: ${context}
        `,
    },
  });

  await storeLastFiveQA(sessionId, userQuery, response.text);

  return response.text;
}
