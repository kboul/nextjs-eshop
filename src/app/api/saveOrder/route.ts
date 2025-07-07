import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/utils";

export async function POST(request: NextRequest) {
  try {
    const { products, name, lastName, address, shopName, phoneNumber, tin, email } = await request.json();

    // Find existing customer by email or TIN
    const customers = await stripe.customers.list({
      limit: 1,
      email
    });

    let customer = customers.data.find((c) => c.metadata?.tin === tin);

    if (!customer) {
      customer = await stripe.customers.create({
        name: `${name} ${lastName}`,
        email,
        address: { line1: address },
        metadata: { shopName, tin, phoneNumber }
      });
    }

    const quote = await stripe.quotes.create({
      customer: customer.id,
      line_items: products.map((item: any) => ({
        price_data: {
          currency: "eur",
          product: item.id,
          unit_amount: Math.round(item.price * item.quantity * 100) // Total price in cents
        },
        quantity: item.quantity
      })),
      metadata: {
        customerName: `${name} ${lastName}`,
        shopName,
        tin,
        phoneNumber,
        address: JSON.stringify(address)
      }
    });

    return NextResponse.json({ quoteId: quote.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}
