import Stripe from "stripe";

type LocalState = { orders: Stripe.Quote[]; loading: boolean; selectedOrder: Stripe.Quote | null };

type OrderAction = "finalize" | "accept" | "cancel";

export type { LocalState, OrderAction };
