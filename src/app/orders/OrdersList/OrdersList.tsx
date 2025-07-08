"use client";

import { useEffect, useState } from "react";
import { Check, Send, X } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { LocalState, OrderAction } from "./types";
import { getStatusBadge, getGreekOrderAction } from "./utils";

const initialState = { orders: [], loading: true, selectedOrder: null };

export default function OrdersList() {
  const [state, setState] = useState<LocalState>(initialState);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setState((prevState) => ({ ...prevState, orders: data.orders.data, loading: false }));
      })
      .catch(() => setState((prevState) => ({ ...prevState, loading: false })));
  }, []);

  async function handleAction(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: OrderAction,
    quoteId: string
  ) {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/orders/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId })
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Παραγγελία ${getGreekOrderAction(action)} επιτυχώς!`);
        window.location.reload();
        return;
      }

      toast.error(`Σφάλμα: ${data.error}`);
    } catch (error) {
      alert("Κάτι πήγε στραβά.");
    }
  }

  const { orders, loading, selectedOrder } = state;

  if (loading) return <p>Φόρτωση παραγγελιών...</p>;
  if (orders.length === 0) return <p className="text-center text-gray-500">Δεν έχετε παραγγελίες ακόμη.</p>;

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-xl mb-4">Οι παραγγελίες σας</h1>
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

              {order.status !== "canceled" && (
                <div className="flex gap-2 mt-2">
                  {order.status === "draft" && (
                    <Tooltip
                      Trigger={
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-xs whitespace-nowrap"
                          onClick={(e) => handleAction(e, "finalize", order.id)}>
                          <Send className="w-4 h-4" />
                          <span className="hidden xs:inline">Στάλθηκε</span>
                        </Button>
                      }>
                      Παραγγελία Στάλθηκε
                    </Tooltip>
                  )}
                  {order.status === "open" && (
                    <Tooltip
                      Trigger={
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-xs whitespace-nowrap"
                          onClick={(e) => handleAction(e, "accept", order.id)}>
                          <Check className="w-4 h-4" />
                          <span className="hidden xs:inline">Ολοκλήρωση</span>
                        </Button>
                      }>
                      Ολοκλήρωση Παραγγελίας
                    </Tooltip>
                  )}
                  {order.status !== "accepted" && (
                    <Tooltip
                      Trigger={
                        <Button
                          variant="destructive"
                          className="text-sm hover:bg-red-700 sm:text-xs whitespace-nowrap"
                          onClick={(e) => handleAction(e, "cancel", order.id)}>
                          <X className="w-4 h-4 " />
                          <span className="hidden xs:inline">Ακύρωση</span>
                        </Button>
                      }>
                      Ακύρωση Παραγγελίας
                    </Tooltip>
                  )}
                </div>
              )}
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
            <ScrollArea className="max-h-[70vh] pr-2">
              <div className="space-y-4 mt-4">
                <div>
                  <p>
                    Κωδικός: <b>{selectedOrder.id}</b>
                  </p>
                  <p>Κατάσταση: {getStatusBadge(selectedOrder.status)}</p>
                  <p>
                    Σύνολο: <b>€{(selectedOrder.amount_total / 100).toFixed(2)}</b>
                  </p>
                  <p>Δημιουργήθηκε: {new Date(selectedOrder.created * 1000).toLocaleString()}</p>
                </div>

                <Separator />

                {selectedOrder.metadata && (
                  <div className="mt-6 space-y-1 text-sm">
                    <h5 className="font-semibold text-base mb-2">Πληροφορίες Πελάτη</h5>
                    <p>
                      Πελάτης: <b>{selectedOrder.metadata.customerName}</b>
                    </p>
                    <p>Τηλέφωνο: {selectedOrder.metadata.phoneNumber}</p>
                    <p>Κατάστημα: {selectedOrder.metadata.shopName}</p>
                    <p>ΑΦΜ: {selectedOrder.metadata.tin}</p>
                    <p>Διεύθυνση: {selectedOrder.metadata.address}</p>
                  </div>
                )}

                <Separator />

                {selectedOrder.line_items && selectedOrder.line_items.data.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-4 gap-2 font-semibold text-sm border-b pb-1">
                      <span>Προιόν</span>
                      <span className="text-center">Ποσότητα (κιλά)</span>
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
            </ScrollArea>
          ) : (
            <p>Φόρτωση Παραγγελίας...</p>
          )}
        </ResponsiveDialog>
      )}
    </div>
  );
}
