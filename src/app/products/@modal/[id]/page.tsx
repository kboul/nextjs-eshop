import { ProductModalWrapper } from "@/components";
import { stripe } from "@/utils";
import Stripe from "stripe";

type ProductPageProps = { params: Promise<{ id: string }> };

export default async function ProductModal({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"]
  });

  const plainProduct: Stripe.Product = JSON.parse(JSON.stringify(product));

  return <ProductModalWrapper product={plainProduct} />;
}
