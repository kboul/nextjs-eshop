const orderStatuses = {
  all: "all",
  accepted: "accepted",
  canceled: "canceled",
  draft: "draft",
  open: "open"
};

const initialState = {
  allOrders: [],
  filteredOrders: [],
  loading: true,
  selectedOrder: null,
  selectedOrderStatus: orderStatuses.all
};

export { initialState, orderStatuses };
