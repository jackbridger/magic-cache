import { openaiClient } from "../lib/openai";

export class EmbeddingHelper {
  static async computeEmbedding(text: string) {
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedPrompt = text.replace(/\n/g, " ");

    // Generate a vector embedding using OpenAI
    const embeddingResponse = await openaiClient.createEmbedding({
      model: "text-embedding-ada-002",
      input: sanitizedPrompt,
    });

    const [{ embedding }] = embeddingResponse.data.data;

    return embedding;
  }
}
