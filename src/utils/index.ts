import { clsx, type ClassValue } from "clsx";
import Stripe from "stripe";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getDefaultPrice(defaultPrice?: string | Stripe.Price | null | undefined) {
  const price = typeof defaultPrice === "object" && defaultPrice ? defaultPrice.unit_amount : null;

  return price
    ? `€${(price / 100).toFixed(2)}` // Stripe stores prices in cents
    : "Price unavailable";
}

export { cn, getDefaultPrice };
export * from "./paths";
export * from "./stripe";
