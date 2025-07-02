"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store";
import { CreditCard, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, addItem, removeItem, clearCart } = useCartStore();

  const total = items.reduce((prevValue, currentItem) => prevValue + currentItem.price * currentItem.quantity, 0);
  console.log({ items, total });

  if (total === 0 || items.length === 0) return <h1>Το καλάθι σας ειναι άδειο</h1>;
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h1 className="text-2xl font-semibold">Ολοκλήρωση αγοράς</h1>
          <p className="text-muted-foreground">
            {items.length} προϊόν{items.length === 1 ? "" : "τα"} στο καλάθι σας
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="flex h-full flex-col md:flex-row">
                  {/* Product Image */}
                  <div className="relative h-auto w-full md:w-32">
                    <Image
                      src={item.imageUrl ?? ""}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover md:w-32"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-6 pb-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        {item.description && <p>{item.description}</p>}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button onClick={() => removeItem(item.id)} size="icon" variant="outline">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          onClick={() =>
                            addItem({
                              id: item.id,
                              name: item.name,
                              price: Number(item.price),
                              imageUrl: item.imageUrl ?? null,
                              quantity: 1
                            })
                          }
                          size="icon"
                          variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between font-medium">
          <span>Σύνολο</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <form action="">
          <Button className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Πληρωμή
          </Button>
        </form>

        <Button className="w-full mt-0" onClick={clearCart}>
          Καθαρισμός καλαθιού
        </Button>
      </div>
    </div>
  );
}
