import ai from "../config/gemini";
import { getLastFiveQA } from "../utils/helpers/llmCache";
import { history } from "../utils/history";

export async function transformQuery({
  userQuery,
  sessionId,
}: {
  userQuery: string;
  sessionId: string;
}) {
  const lastHistory = await getLastFiveQA(sessionId);

  for (const item of lastHistory.reverse()) {
    history.push({
      role: "user",
      parts: [{ text: item.question }],
    });

    history.push({
      role: "model",
      parts: [{ text: item.answer }],
    });
  }

  // 3️⃣ Current follow-up question append
  history.push({
    role: "user",
    parts: [{ text: userQuery }],
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
