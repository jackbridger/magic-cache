import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import { z } from "zod";

import {
  APIError,
  BadRequestError,
  InternalError,
  NotFoundError,
} from "../../common/errors/api_error";
import { EmbeddingHelper } from "../../helpers/embedding_helper";
import { supabaseClient } from "../../lib/supabase";

dotenv.config();

const payloadSchema = z.object({
  prompt: z.string().nonempty(),
  similarity_threshold: z.number().min(0).max(1).default(0.7),
});

// extract the inferred type
type Payload = z.infer<typeof payloadSchema>;

export default async (req: express.Request, res: express.Response) => {
  try {
    const zodRes = payloadSchema.safeParse(req.query);
    if (!zodRes.success)
      throw new BadRequestError(
        zodRes.error.errors
          .map((error: any) => `${error.code} ${error.path} ${error.message}`)
          .join(",")
      );

    const payload: Payload = zodRes.data;

    const promptEmbedding = await EmbeddingHelper.computeEmbedding(
      payload.prompt
    );

    const { data: documents } = await supabaseClient.rpc("match_documents", {
      query_embedding: promptEmbedding,
      match_threshold: payload.similarity_threshold, // Similarity threshold
      match_count: 10, // Number of match
    });

    if (documents.length === 0) throw new NotFoundError("No documents found");

    return res.json(documents);
  } catch (e) {
    console.error(e);
    if (e instanceof APIError) throw e;
    throw new InternalError((e as Error).message);
  }
};
