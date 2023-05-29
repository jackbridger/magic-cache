import { BaseError } from "./base_error";

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  PAYMENT_REQUIRED = 402,
  UNAUTHORIZED = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER = 500,
}

export class APIError extends BaseError {
  public readonly httpCode: HttpStatusCode;

  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    description = "internal server error"
  ) {
    super(name, true, description);
    this.httpCode = httpCode;
  }
}

export class InternalError extends APIError {
  constructor(description = "internal") {
    super("internal", HttpStatusCode.INTERNAL_SERVER, description);
  }
}

export class NotFoundError extends APIError {
  constructor(description = "not found") {
    super("not-found", HttpStatusCode.NOT_FOUND, description);
  }
}

export class BadRequestError extends APIError {
  constructor(description = "bad request") {
    super("bad-request", HttpStatusCode.BAD_REQUEST, description);
  }
}

export class ConflictError extends APIError {
  constructor(description = "conflict") {
    super("conflict", HttpStatusCode.CONFLICT, description);
  }
}

export class UnauthenticatedError extends APIError {
  constructor(description = "unauthenticated") {
    super("unauthenticated", HttpStatusCode.UNAUTHENTICATED, description);
  }
}

export class UnauthorizedError extends APIError {
  constructor(description = "unauthorized") {
    super("unauthorized", HttpStatusCode.UNAUTHORIZED, description);
  }
}

export class PaymentRequiredError extends APIError {
  constructor(description = "payment-required") {
    super("payment-required", HttpStatusCode.PAYMENT_REQUIRED, description);
  }
}

export class TooManyRequestsError extends APIError {
  constructor(description = "too-many-requests") {
    super("too-many-requests", HttpStatusCode.TOO_MANY_REQUESTS, description);
  }
}
