import { NextResponse } from "next/server";

import { stripe } from "@/utils";

// open	Quote finalized and sent to customer	stripe.quotes.finalizeQuote(id)
export async function POST(req: Request) {
  const { quoteId } = await req.json();

  try {
    const quote = await stripe.quotes.finalizeQuote(quoteId);
    return NextResponse.json({ success: true, quote });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
