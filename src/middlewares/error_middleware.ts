import express from "express";
import { APIError, InternalError } from "../common/errors/api_error";
import { BaseError } from "../common/errors/base_error";

export default function handleErrors(
  error: Error,
  req: express.Request,
  res: express.Response,
  _: express.NextFunction
) {
  if (!(error instanceof BaseError) || !error.isOperational) {
    // shit went south, log error somewhere I can look at it
  }

  if (!(error instanceof APIError) || error instanceof InternalError) {
    console.error(error, {
      url: req.originalUrl,
    });
    return res.status(500).send({
      name: "internal",
      message: "Internal server error, please try again later.",
    });
  }

  return res
    .status(error.httpCode)
    .send({ name: error.name, message: error.message });
}
