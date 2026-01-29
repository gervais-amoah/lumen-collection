// /lib/algolia.ts
import { liteClient as algoliasearch } from "algoliasearch/lite";

// Read env vars statically so Next.js can inline them in client bundles
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
const agentId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ID;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;
const agentAppId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_APP_ID;
const agentApiKey = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_API_KEY;
const agentIndexName = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME;

// Runtime validation (still useful!)
if (!appId) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_APP_ID");
if (!apiKey) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_API_KEY");
if (!agentId) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_AGENT_ID");
if (!indexName) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_INDEX_NAME");
if (!agentAppId) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_AGENT_APP_ID");
if (!agentApiKey) throw new Error("Missing NEXT_PUBLIC_ALGOLIA_AGENT_API_KEY");
if (!agentIndexName)
  throw new Error("Missing NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME");

export const ALGOLIA_CONFIG = {
  appId,
  apiKey,
  agentId,
  indexName,
  agentAppId,
  agentApiKey,
  agentIndexName,
};

export const searchClient = algoliasearch(agentAppId, agentApiKey);
