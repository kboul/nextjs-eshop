import Stripe from "stripe";

type LocalState = {
  allOrders: Stripe.Quote[];
  filteredOrders: Stripe.Quote[];
  loading: boolean;
  selectedOrder: Stripe.Quote | null;
  selectedOrderStatus: string;
};

type OrderAction = "finalize" | "accept" | "cancel";

export type { LocalState, OrderAction };
