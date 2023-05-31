import { Router } from "express";
import post from "./post";
import get from "./get";

export const apiCacheRouter = Router({ mergeParams: true }); // inherit params from parents

apiCacheRouter.post("/", post);
apiCacheRouter.get("/", get);
