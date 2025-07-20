import Stripe from "stripe";

type LocalState = {
  allOrders: Stripe.Quote[];
  filteredOrders: Stripe.Quote[];
  loading: boolean;
  selectedOrder: Stripe.Quote | null;
  selectedOrderStatus: string;
};

type OrderAction = "finalize" | "accept" | "cancel";

type OrderStatus = Stripe.Quote["status"] | "all";

export type { OrderStatus, LocalState, OrderAction };
