import ai from "../../lib/geminiClient";
import { transformQuery } from "./queryTransformer";
import { embedQuery } from "./embedQuery";
import { searchVector } from "./vectorSearch";
import { history } from "./history";
import { storeLastFiveQA } from "./llmCache";
import UserQueryInterface from "../interfaces/userQueryInterface";

export default async function chat({
  userQuery,
  sessionId,
}: UserQueryInterface) {
  try {
    const rewrittenQuery = await transformQuery({ userQuery, sessionId });
    const vector = await embedQuery(rewrittenQuery);
    const context = await searchVector(vector);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: rewrittenQuery,
      config: {
        systemInstruction: `
      You have to behave like a News Analysis Expert.
      You will be given a context containing relevant news information.
      Your task is to answer the user's question based ONLY on the provided context.
      If the answer is not present in the context, politely inform the user that you could not find the answer.
      "I could not find the answer in the provided document."
      Keep your answers clear, factual, concise, and written in a professional news-reporting tone.
      
      Context: ${context}
        `,
      },
    });
    await storeLastFiveQA(sessionId, userQuery, response.text);

    return response.text;
  } catch (error) {
    console.log("Error in chatService:", error);
  }
}
