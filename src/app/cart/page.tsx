"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store";
import { paths } from "@/utils";
import { quantityToAddSubtract } from "@/constants";

export default function CartPage() {
  const { products, addProductQuantity, removeProductQuantity, removeProduct, clearCart } = useCartStore();

  const total = products.reduce((prevValue, currentItem) => prevValue + currentItem.price * currentItem.quantity, 0);

  if (total === 0 || products.length === 0) return <h1>Το καλάθι σας ειναι άδειο</h1>;
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h1 className="text-2xl font-semibold">{paths.cart.label}</h1>
          <p className="text-muted-foreground">
            {products.length} προϊόν{products.length === 1 ? "" : "τα"} στο καλάθι σας
          </p>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="flex h-full flex-col md:flex-row">
                  {/* Product Image */}
                  <div className="relative h-auto w-full md:w-32">
                    <Image
                      alt={product.name}
                      className="h-full w-full object-cover md:w-32"
                      src={product.imageUrl ?? ""}
                      width={500}
                      height={500}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-6 pb-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        {product.description && <p>{product.description}</p>}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button onClick={() => removeProductQuantity(product.id)} size="icon" variant="outline">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{product.quantity}</span>
                        <Button
                          onClick={() =>
                            addProductQuantity({
                              id: product.id,
                              name: product.name,
                              price: Number(product.price),
                              imageUrl: product.imageUrl ?? null,
                              quantity: quantityToAddSubtract
                            })
                          }
                          size="icon"
                          variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="font-medium">€{(product.price * product.quantity).toFixed(2)}</div>
                        <div className="text-muted-foreground text-sm ">
                          {product.quantity} &times; {product.price}€/κιλό
                        </div>
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
        <Button className="w-full">Ολοκλήρωση παραγγελίας</Button>

        <Button className="w-full" onClick={clearCart}>
          Καθαρισμός καλαθιού
        </Button>
      </div>
    </div>
  );
}
