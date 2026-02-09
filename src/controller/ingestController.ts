import { Request, Response, NextFunction } from "express";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { embeddings } from "../lib/embeddingClient";
import { pineconeIndex } from "../lib/pineconeClient";
import { CustomError } from "../utils/helpers/customError";
import { HttpStatusCode } from "../utils/enums/httpStatusCode";

export const ingestNews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!_req.file) {
      return res.status(400).json({
        success: false,
        error: "Only JSON file is allowed",
      });
    }

    const jsonString = _req.file.buffer.toString("utf-8");
    const newsData = JSON.parse(jsonString);

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

    // ✅ CHANGE START (ONLY THIS)

   const texts = chunkedDocs.map((doc) => doc.pageContent);

const vectors = [];

for (let i = 0; i < texts.length; i++) {
  const text = texts[i];

  const vec = await embeddings.embedQuery(text);

  console.log("Chunk", i, "Vector Length:", vec.length);

  vectors.push(vec);
}

await pineconeIndex.upsert(
  chunkedDocs.map((doc, i) => ({
    id: doc.metadata.id + "-" + i,
    values: vectors[i],

    metadata: {
      id: String(doc.metadata.id),
      title: String(doc.metadata.title),
      source: String(doc.metadata.source),
      text: doc.pageContent,
    },
  }))
);



    // ✅ CHANGE END

    res.json({
      success: true,
      chunks: chunkedDocs.length,
      message: "News ingested successfully",
    });
  } catch (error) {
    console.error(error);
    next(
      new CustomError(
        "Failed to process chat request",
        HttpStatusCode.SERVICE_UNAVAILABLE
      )
    );
  }
};
