"use client";

import Image from "next/image";
import Stripe from "stripe";

import { getDefaultPrice } from "@/utils";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type ProductDetailProps = { product: Partial<Stripe.Product> };

export default function ProductDetail({ product }: ProductDetailProps) {
  const price = getDefaultPrice(product.default_price);
  return (
    product.images?.[0] && (
      <div className="relative w-full">
        <div className="flex gap-2">
          <div className="flex justify-center m-6">
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
              {price && <p className="text-lg font-semibold text-gray-900">{price}/κιλό</p>}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => {}}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">0</span>
                <Button variant="outline" size="icon" onClick={() => {}}>
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
