import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/utils";

type ProductPageProps = { params: { id: string } };

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"]
  });

  console.log(product);
  return <ProductDetail product={product} />;
}
