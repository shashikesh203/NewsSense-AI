import { pineconeIndex } from "../config/pinecone";

export async function searchVector(vector: number[]) {
  const result = await pineconeIndex.query({
    vector,
    topK: 10,
    includeMetadata: true,
  });

  return result.matches
    .map((m) => m.metadata?.text)
    .join("\n\n---\n\n");
}
