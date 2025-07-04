"use client";

import Image from "next/image";
import Stripe from "stripe";
import { Minus, Plus } from "lucide-react";

import { Button } from "./ui/button";
import { getDefaultPrice } from "@/utils";
import { useCartStore } from "@/store";
import { quantityToAddSubtract } from "@/constants";

type ProductDetailProps = { product: Stripe.Product };

export default function ProductDetail({ product }: ProductDetailProps) {
  const { products, addProductQuantity, removeProductQuantity } = useCartStore();

  const cartItem = products.find(({ id }) => id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const { price, priceWithCurrency } = getDefaultPrice(product.default_price);

  return (
    product.images?.[0] && (
      <div className="relative w-full">
        <div className="flex gap-2">
          <div className="flex justify-center m-6 ml-0">
            <Image
              alt={product?.name ?? ""}
              className="group-hover:opacity-90 transition-opacity duration-300 rounded"
              src={product.images[0]}
              width={250}
              height={300}
            />
          </div>

          <div className="flex flex-col justify-center">
            <div>
              {product.description && <p>{product.description}</p>}
              {priceWithCurrency && <p className="text-lg font-semibold text-gray-900">{priceWithCurrency}/κιλό</p>}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button onClick={() => removeProductQuantity(product.id)} size="icon" variant="outline">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  onClick={() =>
                    addProductQuantity({
                      id: product.id,
                      name: product.name,
                      price: Number(price),
                      imageUrl: product.images ? product.images[0] : null,
                      quantity: quantityToAddSubtract
                    })
                  }
                  size="icon"
                  variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
