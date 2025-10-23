import { Mixedbread } from "@mixedbread/sdk";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParam = searchParams.get("q") || "";

  // Use a default broad query if none provided to fetch general clothing items
  const query = queryParam.trim() || "clothing";

  if (!process.env.MXBAI_API_KEY) {
    return NextResponse.json(
      { error: "Mixedbread API key not configured" },
      { status: 500 },
    );
  }

  if (!process.env.MXBAI_STORE_ID) {
    return NextResponse.json(
      { error: "Mixedbread store ID not configured" },
      { status: 500 },
    );
  }

  try {
    const client = new Mixedbread({
      apiKey: process.env.MXBAI_API_KEY,
    });

    const response = await client.stores.search({
      query,
      store_identifiers: [process.env.MXBAI_STORE_ID],
      top_k: 20,
      search_options: {
        return_metadata: true,
        score_threshold: 0.5,
      },
    });

    return NextResponse.json({ results: response.data || [] });
  } catch (error) {
    console.error("Mixedbread search error:", error);
    return NextResponse.json(
      { error: "Failed to search Mixedbread store" },
      { status: 500 },
    );
  }
}
