// import express from "express";
// import jwt from "jsonwebtoken";
// import { ACCESS_TOKEN_COOKIE_NAME } from "../api/auth/signin/post";
// import {
//   UnauthenticatedError,
//   UnauthorizedError,
// } from "../common/errors/api_error";

// export async function attachSession(
//   req: express.Request,
//   _: express.Response,
//   next: express.NextFunction
// ) {
//   const headerToken = req.headers.authorization;
//   const cookieToken = req.cookies[ACCESS_TOKEN_COOKIE_NAME];

//   if (!cookieToken && !headerToken) {
//     req.session = null;
//     next();
//     return;
//   }
//   const token = cookieToken ? cookieToken : headerToken!.split("Bearer ")[1];
//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     ) as jwt.JwtPayload;
//     console.log(decoded);
//     req.session = { userId: decoded["user_id"] };
//     analyticsService.identify(req.session.userId, {});
//   } catch (err) {
//     // @ts-ignore
//     throw new UnauthorizedError(`Unauthorized. Reason: ${err.message}`);
//   }

//   next();
// }

// export async function requireSession(
//   req: express.Request,
//   _: express.Response,
//   next: express.NextFunction
// ) {
//   if (req.session == null || req.session.userId == null)
//     throw new UnauthenticatedError("Authentication token required.");

//   next();
// }

// // export async function authenticateWithApiKey(
// //   req: express.Request,
// //   _: express.Response,
// //   next: express.NextFunction,
// // ) {
// //   const rawToken = req.headers.authorization;

// //   if (!rawToken || !rawToken.startsWith('ApiKey '))
// //     throw new UnauthenticatedError('Missing Api Key.');

// //   const apiKey = rawToken.split('ApiKey ')[1];

// //   if (apiKey !== process.env.ZIGG_API_KEY)
// //     throw new UnauthenticatedError('Invalid API key.');
// //   req.session = 'admin';

// //   next();
// // }
