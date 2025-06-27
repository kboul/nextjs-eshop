import Image from "next/image";
import Stripe from "stripe";

import { getDefaultPrice } from "@/utils";

type ProductDetailProps = { product: Stripe.Product };

export default function ProductDetail({ product }: ProductDetailProps) {
  const price = getDefaultPrice(product.default_price);
  return (
    product.images?.[0] && (
      <div className="relative h-60 w-full">
        <Image
          alt={product.name}
          className="group-hover:opacity-90 transition-opacity duration-300 rounded"
          src={product.images[0]}
          objectFit="cover"
          width={240}
          height={240}
        />

        <div>
          <h1>{product.name}</h1>
          {product.description && <p>{product.description}</p>}
          {price && <p className="text-lg font-semibold text-gray-900">{price}</p>}
        </div>
      </div>
    )
  );
}
