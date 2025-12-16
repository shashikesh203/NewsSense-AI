import  ai  from "../config/gemini";
import { transformQuery } from "./queryTransformer";
import { embedQuery } from "./embeddings";
import { searchVector } from "./vectorSearch";
import { history } from "../utils/history";

export default async function chat(question: string) {
  const rewrittenQuery = await transformQuery(question);
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
      You have to behave like a Data Structure and Algorithm Expert.
    You will be given a context of relevant information and a user question.
    Your task is to answer the user's question based ONLY on the provided context.
    If the answer is not in the context, you must say "I could not find the answer in the provided document."
    Keep your answers clear, concise, and educational.
      
      Context: ${context}
        `,
    },
  });

  history.push({
    role: "model",
    parts: [{ text: response.text }],
  });

  return response.text;
}
