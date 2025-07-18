import Stripe from "stripe";

export const getDefaultPrice = (defaultPrice?: string | Stripe.Price | null | undefined) => {
  const priceUnformatted = typeof defaultPrice === "object" && defaultPrice ? defaultPrice.unit_amount : null;

  const price = priceUnformatted ? (priceUnformatted / 100).toFixed(2) : "0";
  return {
    price,
    // Stripe stores prices in cents
    priceWithCurrency: price ? `€${price}` : "Price unavailable"
  };
};
