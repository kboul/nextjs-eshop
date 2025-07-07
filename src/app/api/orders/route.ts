import { NextResponse } from "next/server";

import { stripe } from "@/utils";

export async function GET() {
  try {
    const orders = await stripe.quotes.list({ limit: 10 });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
