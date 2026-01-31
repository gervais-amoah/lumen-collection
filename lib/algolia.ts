// /lib/algolia.ts
import { liteClient as algoliasearch } from "algoliasearch/lite";

// Read env vars statically so Next.js can inline them in client bundles
const agentId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ID;
const agentAppId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_APP_ID;
const agentApiKey = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_API_KEY;
const agentIndexName = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME;

// Runtime validation (still useful!)
if (!agentId) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_AGENT_ID");
if (!agentAppId) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_AGENT_APP_ID");
if (!agentApiKey) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_AGENT_API_KEY");
if (!agentIndexName)
  throw new Error("Missing NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME");

export const ALGOLIA_CONFIG = {
  agentId,
  agentAppId,
  agentApiKey,
  agentIndexName,
};

export const searchClient = algoliasearch(agentAppId, agentApiKey);
