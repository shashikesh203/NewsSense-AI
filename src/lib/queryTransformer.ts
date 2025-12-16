import ai from "../config/gemini";
import { history } from "../utils/history";

export async function transformQuery(question: string) {
  history.push({
    role: "user",
    parts: [{ text: question }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      systemInstruction: `
       You are a query rewriting expert. Based on the provided chat history, rephrase the "Follow Up user Question" into a complete, standalone question that can be understood without the chat history.
    Only output the rewritten question and nothing else.
        `,
    },
  });

  history.pop();
  return response.text;
}
