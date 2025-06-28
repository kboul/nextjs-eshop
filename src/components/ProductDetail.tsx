import Image from "next/image";
import Stripe from "stripe";

import { getDefaultPrice } from "@/utils";

type ProductDetailProps = { product: Partial<Stripe.Product> };

export default function ProductDetail({ product }: ProductDetailProps) {
  const price = getDefaultPrice(product.default_price);
  return (
    product.images?.[0] && (
      <div className="relative w-full">
        <div className="flex justify-center m-6">
          <Image
            alt={product?.name ?? ""}
            className="group-hover:opacity-90 transition-opacity duration-300 rounded"
            src={product.images[0]}
            width={250}
            height={300}
          />
        </div>

        <div>
          {product.description && <p>{product.description}</p>}
          {price && <p className="text-lg font-semibold text-gray-900">{price}/κιλό</p>}
        </div>
      </div>
    )
  );
}
