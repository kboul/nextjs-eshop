import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder sympathiqueBuildProcess";

export const stripe = new Stripe(stripeApiKey);
