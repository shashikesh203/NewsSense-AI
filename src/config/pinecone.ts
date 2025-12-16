import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone();

export const pineconeIndex = pinecone.Index(
  process.env.PINECONE_INDEX_NAME!
);
