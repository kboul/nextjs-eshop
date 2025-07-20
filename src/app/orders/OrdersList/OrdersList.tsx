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
import { getStatusBadge, getGreekOrderAction, getOrderTotalAmount } from "./utils";
import StatusFilter from "./StatusFilter";
import { initialState, orderStatuses } from "./constants";

export default function OrdersList() {
  const [state, setState] = useState<LocalState>(initialState);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const allOrders = data.orders.data;
        setState((prevState) => ({
          ...prevState,
          allOrders,
          filteredOrders: allOrders,
          loading: false
        }));
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
    } catch {
      alert("Κάτι πήγε στραβά.");
    }
  }

  const { filteredOrders, loading, selectedOrder, selectedOrderStatus } = state;

  if (loading) return <p>Φόρτωση παραγγελιών...</p>;
  if (filteredOrders.length === 0) return <p className="text-center text-gray-500">Δεν έχετε παραγγελίες ακόμη.</p>;

  const handleFilterChange = (status: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedOrderStatus: status,
      filteredOrders:
        status === orderStatuses.all
          ? prevState.allOrders
          : prevState.allOrders.filter((order) => order.status === status)
    }));
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between">
        <h1 className="text-xl mb-4">Οι παραγγελίες σας</h1>
        <StatusFilter onSelect={handleFilterChange} status={selectedOrderStatus} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredOrders.map((order, index) => (
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
              <p>Σύνολο: €{getOrderTotalAmount(filteredOrders[index]?.line_items?.data ?? [])}</p>
              <p className="text-sm text-gray-500">
                Δημιουργήθηκε: {new Date(order.created * 1000).toLocaleDateString()}
              </p>
              {order.status !== orderStatuses.canceled && (
                <div className="flex gap-2 mt-2">
                  {order.status === orderStatuses.draft && (
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
                  {order.status === orderStatuses.open && (
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
                  {order.status !== orderStatuses.accepted && (
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
                    {selectedOrder.line_items.data.map((item) => {
                      const quantity = item.quantity ? item.quantity / 1000 : 0;
                      const productTotalAmount = item?.price?.unit_amount ? item?.price?.unit_amount / 100 : 0;
                      const unitAmount = productTotalAmount / quantity;
                      return (
                        <div key={item.id} className="grid grid-cols-4 gap-2 text-sm py-1 border-b last:border-none">
                          <span>{item.description}</span>
                          <span className="text-center">{quantity}</span>
                          <span className="text-center">€{unitAmount}</span>
                          <span className="text-right">€{quantity * unitAmount}</span>
                        </div>
                      );
                    })}

                    {/* Total Row */}
                    <div className="grid grid-cols-4 gap-2 text-sm font-semibold pt-2 mt-2">
                      <span className="col-span-3 text-right">Σύνολο</span>
                      <span className="text-right">€{getOrderTotalAmount(selectedOrder?.line_items?.data)}</span>
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
