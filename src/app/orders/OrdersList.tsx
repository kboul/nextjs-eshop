"use client";

import { useEffect, useState } from "react";
import Stripe from "stripe";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Separator } from "@/components/ui/separator";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "accepted":
      return <Badge className="bg-green-100 text-green-800">Εγκρίθηκε</Badge>;
    case "open":
      return <Badge className="bg-blue-100 text-blue-800">Σε εξέλιξη</Badge>;
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

type LocalState = { orders: Stripe.Quote[]; loading: boolean; selectedOrder: Stripe.Quote | null };

export default function OrdersList() {
  const [state, setState] = useState<LocalState>({
    orders: [],
    loading: true,
    selectedOrder: null
  });

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setState((prevState) => ({ ...prevState, orders: data.orders.data, loading: false }));
      })
      .catch(() => setState((prevState) => ({ ...prevState, loading: false })));
  }, []);

  const { orders, loading, selectedOrder } = state;
  console.log(state);

  if (loading) return <p>Φόρτωση παραγγελιών...</p>;
  if (orders.length === 0) return <p className="text-center text-gray-500">Δεν έχετε παραγγελίες ακόμη.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Οι παραγγελίες σας</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setState((prevState) => ({ ...prevState, selectedOrder: order }))}>
            <CardHeader>
              <CardTitle className="text-lg">Κωδικός Παραγγελίας:</CardTitle>
              <CardDescription className="truncate-order-id"> {order.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Κατάσταση: <span className="capitalize">{getStatusBadge(order.status)}</span>
              </p>
              <p>Σύνολο: €{(order.amount_total / 100).toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                Δημιουργήθηκε: {new Date(order.created * 1000).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedOrder && (
        <ResponsiveDialog
          onXClick={() => setState((prevState) => ({ ...prevState, selectedOrder: null }))}
          open={!!selectedOrder}
          title="Λεπτομέρειες Παραγγελίας">
          {selectedOrder ? (
            <div className="space-y-4 mt-4">
              <div>
                <p>
                  <strong>Κωδικός:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Κατάσταση:</strong> {getStatusBadge(selectedOrder.status)}
                </p>
                <p>
                  <strong>Σύνολο:</strong> €{(selectedOrder.amount_total / 100).toFixed(2)}
                </p>
                <p>
                  <strong>Δημιουργήθηκε:</strong> {new Date(selectedOrder.created * 1000).toLocaleString()}
                </p>
              </div>

              <Separator />

              {selectedOrder.metadata && (
                <div className="mt-6 space-y-1 text-sm">
                  <h5 className="font-semibold text-base mb-2">Πληροφορίες Πελάτη</h5>
                  <p>
                    <strong>Πελάτης:</strong> {selectedOrder.metadata.customerName}
                  </p>
                  <p>
                    <strong>Τηλέφωνο:</strong> {selectedOrder.metadata.phoneNumber}
                  </p>
                  <p>
                    <strong>Κατάστημα:</strong> {selectedOrder.metadata.shopName}
                  </p>
                  <p>
                    <strong>ΑΦΜ:</strong> {selectedOrder.metadata.tin}
                  </p>
                  <p>
                    <strong>Διεύθυνση:</strong> {selectedOrder.metadata.address}
                  </p>
                </div>
              )}

              <Separator />

              {selectedOrder.line_items && selectedOrder.line_items.data.length > 0 ? (
                <div>
                  <div className="grid grid-cols-4 gap-2 font-semibold text-sm border-b pb-1">
                    <span>Προιόν</span>
                    <span className="text-center">Ποσότητα</span>
                    <span className="text-center"> Τιμή Μονάδας</span>
                    <span className="text-right">Ποσό</span>
                  </div>
                  {selectedOrder.line_items.data.map((item) => (
                    <div key={item.id} className="grid grid-cols-4 gap-2 text-sm py-1 border-b last:border-none">
                      <span>{item.description}</span>
                      <span className="text-center">{item.quantity}</span>
                      <span className="text-center">€{(item.amount_total / 100).toFixed(2)}</span>
                      <span className="text-right">
                        €{((item.amount_total * (item.quantity ?? 0)) / 100).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  {/* Total Row */}
                  <div className="grid grid-cols-4 gap-2 text-sm font-semibold pt-2 mt-2">
                    <span className="col-span-3 text-right">Σύνολο</span>
                    <span className="text-right">€{(selectedOrder.amount_total / 100).toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <p>Δεν βρέθηκαν στοιχεία παραγγελίας.</p>
              )}
            </div>
          ) : (
            <p>Φόρτωση Παραγγελίας...</p>
          )}
        </ResponsiveDialog>
      )}
    </div>
  );
}
