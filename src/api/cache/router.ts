import { Router } from "express";
import post from "./post";

export const apiCacheRouter = Router({ mergeParams: true }); // inherit params from parents

apiCacheRouter.post("/", post);
