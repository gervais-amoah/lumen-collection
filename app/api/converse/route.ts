// app/api/converse/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getLumenResponse } from "@/lib/gemini";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    // Get Gemini response
    const { assistant_response, query_text } = await getLumenResponse(
      message,
      history
    );

    // For now: just return Gemini response without search
    return Response.json({
      assistant_response,
      query_text,
      products: [], // No search yet
      cache_hit: false,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({
      assistant_response: "One moment — checking our inventory...",
      products: [],
      error: true,
    });
  }
}
