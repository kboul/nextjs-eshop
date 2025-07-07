"use client";

import { useEffect, useState } from "react";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  }, []);

  console.log(orders);

  return <div>OrdersList</div>;
}
