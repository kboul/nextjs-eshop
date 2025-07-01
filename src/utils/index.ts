import { clsx, type ClassValue } from "clsx";
import Stripe from "stripe";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getDefaultPrice(defaultPrice?: string | Stripe.Price | null | undefined) {
  const priceUnformatted = typeof defaultPrice === "object" && defaultPrice ? defaultPrice.unit_amount : null;

  const price = priceUnformatted ? (priceUnformatted / 100).toFixed(2) : "0";
  return {
    price,
    // Stripe stores prices in cents
    priceWithCurrency: price ? `€${price}` : "Price unavailable"
  };
}

export { cn, getDefaultPrice };
export * from "./paths";
export * from "./stripe";
