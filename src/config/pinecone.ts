import { Pinecone } from "@pinecone-database/pinecone";
import config from "../config";


export const pinecone = new Pinecone();

export const pineconeIndex = pinecone.Index(
 config.pineConeConfig.indexName
);
