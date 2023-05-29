import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

export const getUserFromJWT = async (token: string) => {
  const res = await supabase.auth.getUser(token.replace("Bearer ", ""));
  return res.data.user;
};
