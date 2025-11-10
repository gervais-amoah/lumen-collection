// app/api/converse/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Test: Fetch total product count
    const { count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (error) throw new Error(error.message);

    return Response.json({
      success: true,
      message: `Connected to Supabase! Found ${count} products.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Connection Error:", error);
    return Response.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
