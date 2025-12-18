import { pineconeIndex } from "../../lib/pineconeClient";

export async function searchVector(vector: number[]) {
  try {
    const result = await pineconeIndex.query({
      vector,
      topK: 10,
      includeMetadata: true,
    });

    return result.matches.map((m) => m.metadata?.text).join("\n\n---\n\n");
  } catch (error) {
    console.error("Vector search error:", error);
  }
}
