import { Request, Response } from "express";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { PineconeStore } from "@langchain/pinecone";
import { embeddings } from "../config/embeddings";
import { pineconeIndex } from "../config/pinecone";

export const ingestNews = async (_req: Request, res: Response) => {
  try {
    const newsData = JSON.parse(
      fs.readFileSync("src/data/news.json", "utf-8")
    );

    const docs = newsData
      .filter((a: any) => a.content?.trim())
      .map(
        (article: any) =>
          new Document({
            pageContent: article.content,
            metadata: {
              id: article.id,
              title: article.title,
              source: article.source ?? "unknown",
            },
          })
      );

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const chunkedDocs = await splitter.splitDocuments(docs);

    await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    res.json({
      success: true,
      chunks: chunkedDocs.length,
      message: "News ingested successfully 🚀",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ingestion failed" });
  }
};
