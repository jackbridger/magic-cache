import express from "express";
import { apiCacheRouter } from "./cache/router";

const router = express.Router();

router.use("/cache", apiCacheRouter);

export const apiRouter = router;
