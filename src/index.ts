/**
 * Required External Modules
 */

import "./config/environment_config";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { apiRouter } from "./api/router";
import handleErrors from "./middlewares/error_middleware";
/**
 * App Variables
 */
if (!process.env.PORT) {
  console.error("No PORT variable found in env. exiting...");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// API router
app.use("/", apiRouter);
// Custom error handling
app.use(handleErrors);

/**
 * Server Activation
 */
app.listen(PORT);
console.debug(`Listening on port ${PORT}`);

process.on("exit", function (code) {
  console.log(`About to exit with code ${code}`);
});
