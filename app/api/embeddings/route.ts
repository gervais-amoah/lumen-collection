// app/api/embeddings/route.ts
import { NextRequest, NextResponse } from "next/server";

interface CohereEmbedResponse {
  embeddings: {
    float: number[][];
  };
}

interface RequestBody {
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const response = await fetch("https://api.cohere.com/v2/embed", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "embed-v4.0",
        input_type: "search_document",
        texts: [text],
        output_dimension: 256,
      }),
    });

    const data: CohereEmbedResponse = await response.json();

    const embedding = data.embeddings?.float?.[0];
    console.log("Cohere generated embedding length:", embedding?.length);

    if (!embedding) {
      return NextResponse.json(
        { error: "No embedding returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({ embedding });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
