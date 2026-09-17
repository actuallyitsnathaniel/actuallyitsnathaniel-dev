import { optionsOk, unauthorizedHint } from "../src/lib/agent-http.js";

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return optionsOk();
  return unauthorizedHint();
}
