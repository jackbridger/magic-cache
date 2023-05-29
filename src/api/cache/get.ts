import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import { z } from "zod";

import {
  APIError,
  BadRequestError,
  InternalError,
} from "../../common/errors/api_error";

dotenv.config();

const payloadSchema = z.object({
  prompt: z.string().nonempty(),
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
  } catch (e) {
    console.error(e);
    if (e instanceof APIError) throw e;
    throw new InternalError((e as Error).message);
  }
};
