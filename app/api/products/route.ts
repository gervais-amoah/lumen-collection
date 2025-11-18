import { NextRequest, NextResponse } from "next/server";
import { fetchProducts } from "@/lib/get-products";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const products = await fetchProducts({
      category: params.get("category") || undefined,
      type: params.get("type") || undefined,
      color: params.get("color") || undefined,
      limit: params.get("limit") ? Number(params.get("limit")) : undefined,
    });

    return NextResponse.json({ products });
  } catch (err: unknown) {
    let message = "Internal error";

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
