import { embeddings } from "../../lib/embeddingClient";

export const embedQuery = (query: string) => {
  return embeddings.embedQuery(query);
};
