import { NextResponse } from "next/server";

import { stripe } from "@/utils";

// canceled	Quote canceled	stripe.quotes.cancel(id)
export async function POST(req: Request) {
  const { quoteId } = await req.json();
  try {
    const quote = await stripe.quotes.cancel(quoteId);
    return NextResponse.json({ success: true, quote });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
