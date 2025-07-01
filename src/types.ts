import Stripe from "stripe";

type ProductDialog = {
  id: string;
  name: string;
  metadata: Stripe.Metadata;
  images: string[];
  description: string | null;
  defaultPrice: string | Stripe.Price | null | undefined;
};

export type { ProductDialog };
