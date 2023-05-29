import * as dotenv from "dotenv";
console.debug("Loaded env variables...");
const config = dotenv.config();
process.env = { ...process.env, ...config.parsed };
