"use client";

import { useEffect, useState } from "react";
import Stripe from "stripe";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "accepted":
      return <Badge className="bg-green-100 text-green-800">Εγκρίθηκε</Badge>;
    case "open":
      return <Badge className="bg-yellow-100 text-yellow-800">Σε εξέλιξη</Badge>;
    case "expired":
      return <Badge className="bg-red-100 text-red-800">Έληξε</Badge>;
    case "draft":
      return <Badge className="bg-gray-100 text-gray-800">Πρόχειρο</Badge>;
    case "canceled":
      return <Badge variant="destructive">Ακυρώθηκε</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function OrdersList() {
  const [orders, setOrders] = useState<Stripe.Quote[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders.data));
  }, []);

  console.log(orders);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Id Παραγγελίας: {order.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Κατάσταση: <span className="capitalize">{getStatusBadge(order.status)}</span>
              </p>
              <p>Σύνολο: ${(order.amount_total / 100).toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                Δημιουργήθηκε: {new Date(order.created * 1000).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
